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
import Planet from './images/planet.svg';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchPlanetData } from './redux/PlanetsSlice';

function PlanetPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.planets.data);
  const loadingStatus = useAppSelector((state) => state.planets.status);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPlanetData(id));
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
      <img src={Planet} alt="planet" className="picture" />
      <ul>
        <li>
          Population:
          {' '}
          {data.population}
        </li>
        <li>
          Climate:
          {' '}
          {data.climate}
        </li>
        <li>
          Terrain:
          {' '}
          {data.terrain}
        </li>
        <li>
          Diameter:
          {' '}
          {data.diameter}
          km
        </li>
        <li>
          Gravity:
          {' '}
          {data.gravity}
        </li>
        <li>
          Day:
          {' '}
          {data.rotation_period}
          {' '}
          standard hours
        </li>
        <li>
          Year:
          {' '}
          {data.orbital_period}
          {' '}
          local days
        </li>
        <li>
          Surface Water:
          {' '}
          {data.surface_water}
          %
        </li>
      </ul>
      <Accordion className="reference-section" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Residents
        </AccordionSummary>
        <AccordionDetails className="reference-section-content">
          {
            data.residents.length
              ? data.residents.map((resident) => (
                <PreviewPanel
                  bigPicture
                  type={Filters.PEOPLE}
                  key={resident.url}
                  url={resident.url}
                  name={resident.name}
                />
              ))
              : 'No known residents'
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default PlanetPage;
