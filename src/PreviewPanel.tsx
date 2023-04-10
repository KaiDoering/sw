import './PreviewPanel.scss';

import React from 'react';

import { Paper } from '@mui/material';
import { Person, Public, RocketLaunch } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import Filters from './Filters';

type PropTypes = {
  bigPicture?: boolean;
  name: string;
  url: string;
  type: Filters;
};

function PreviewPanel({
  bigPicture = false,
  name,
  url,
  type,
}: PropTypes) {
  let icon;

  switch (type) {
    case Filters.PEOPLE: icon = <Person color="primary" />; break;
    case Filters.PLANETS: icon = <Public color="primary" />; break;
    case Filters.STARSHIPS: icon = <RocketLaunch color="primary" />; break;
    default: icon = null; break;
  }
  return (
    <Link to={url}>
      <Paper className={`preview-panel ${bigPicture ? 'big-picture' : ''}`}>
        {icon}
        {name}
      </Paper>
    </Link>
  );
}

export default PreviewPanel;
