import './DataPage.scss';

import React, { useEffect } from 'react';

import {
  AccountCircle,
  ExpandMore,
  Female,
  Male,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import States from './States';
import Filters from './Filters';
import PreviewPanel from './PreviewPanel';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchPeopleData } from './redux/PeopleSlice';

function PeoplePage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.people.data);
  const loadingStatus = useAppSelector((state) => state.people.status);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPeopleData(id));
  }, []);

  if (loadingStatus === States.ERROR) {
    return null;
  }

  let gender;
  if (data.gender === 'male') {
    gender = <Male className="icon" />;
  } else if (data.gender === 'female') {
    gender = <Female className="icon" />;
  } else {
    gender = data.gender;
  }

  return (
    <div className="data-page-container">
      <Typography color="primary" variant="h4" className="header">
        {data.name}
      </Typography>
      {/* maybe maintain images in future, if swapi won't add any */}
      <AccountCircle color="primary" className="picture" />
      <ul>
        <li>
          Gender:
          {' '}
          {gender}
        </li>
        <li>
          Birth year:
          {' '}
          {data.birth_year}
        </li>
        <li>
          Height:
          {' '}
          {data.height}
          cm
        </li>
        <li>
          Mass:
          {' '}
          {data.mass}
          kg
        </li>
        <li>
          Eye color:
          {' '}
          {data.eye_color}
        </li>
        <li>
          Hair color:
          {' '}
          {data.hair_color}
        </li>
        <li>
          Skin color:
          {' '}
          {data.skin_color}
        </li>
        <li>
          Homeworld:
          {' '}
          <Link to={data.homeworld.url}>
            {data.homeworld.name}
          </Link>
        </li>
      </ul>
      <Accordion className="reference-section" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Starships
        </AccordionSummary>
        <AccordionDetails className="reference-section-content">
          {
            data.starships.length
              ? data.starships.map((starship) => (
                <PreviewPanel
                  bigPicture
                  type={Filters.STARSHIPS}
                  key={starship.url}
                  url={starship.url}
                  name={starship.name}
                />
              ))
              : 'No association to any starship'
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default PeoplePage;
