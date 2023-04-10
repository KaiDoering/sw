import './DataPage.scss';

import React, { useEffect } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import States from './States';
import Filters from './Filters';
import PreviewPanel from './PreviewPanel';
import Spaceship from './images/spaceship.svg';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchStarshipData } from './redux/StarshipsSlice';

function StarshipPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.starships.data);
  const loadingStatus = useAppSelector((state) => state.starships.status);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchStarshipData(id));
  }, []);

  if (loadingStatus === States.ERROR) {
    return null;
  }

  return (
    <div className="data-page-container">
      <Typography color="primary" variant="h4" className="header">
        {data.name}
      </Typography>
      {/* maybe maintain images in future, if swapi won't add any */}
      <img src={Spaceship} alt="planet" className="picture" />
      <ul>
        <li>
          Class:
          {' '}
          {data.starship_class}
        </li>
        <li>
          Model:
          {' '}
          {data.model}
        </li>
        <li>
          Manufacturer:
          {' '}
          {data.manufacturer}
        </li>
        <li>
          Length:
          {' '}
          {data.length}
        </li>
        <li>
          Maximum megalights/hour:
          {' '}
          {data.MGLT}
        </li>
        <li>
          Hyperdrive rating:
          {' '}
          {data.hyperdrive_rating}
        </li>
        <li>
          Crew size:
          {' '}
          {data.crew}
        </li>
        {
          data.passengers !== '0' && (
            <li>
              Passenger capactity:
              {' '}
              {data.passengers}
            </li>
          )
        }
        <li>
          Cargo capactity:
          {' '}
          {data.cargo_capacity}
          kg
        </li>
        <li>
          Cost:
          {' '}
          {data.cost_in_credits}
          {' '}
          Credits
        </li>
      </ul>
      <Accordion className="reference-section" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Pilots
        </AccordionSummary>
        <AccordionDetails className="reference-section-content">
          {
            data.pilots.length
              ? data.pilots.map((pilot) => (
                <PreviewPanel
                  bigPicture
                  type={Filters.PEOPLE}
                  key={pilot.url}
                  url={pilot.url}
                  name={pilot.name}
                />
              ))
              : 'No known pilots'
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default StarshipPage;
