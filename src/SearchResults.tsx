import './SearchResults.scss';

import React from 'react';

import { Alert, ToggleButton, ToggleButtonGroup } from '@mui/material';

import Spinner from './Spinner';
import States from './States';
import Filters from './Filters';
import PreviewPanel from './PreviewPanel';

import { useAppSelector } from './hooks/redux';

type PropTypes = {
  selectedFilter: Filters,
  onChangeFilter: (_: unknown, value: Filters) => void,
};

function SearchResults({ selectedFilter, onChangeFilter }: PropTypes) {
  const searchStatus = useAppSelector((state) => state.search.status);
  const searchResults = useAppSelector((state) => state.search.results);

  switch (searchStatus) {
    case States.INITIAL: return null;
    case States.LOADING: return <Spinner />;
    case States.ERROR: return (
      <Alert severity="error">
        There was an error, please try again!
      </Alert>
    );
    case States.LOADED:
    default:
      if (searchResults.length === 0) {
        return <>No results</>;
      }
      return (
        <div className="search-results-container">
          <ToggleButtonGroup
            color="primary"
            orientation="vertical"
            value={selectedFilter}
            exclusive
            onChange={onChangeFilter}
            aria-label="filter"
          >
            <ToggleButton value={Filters.ALL}>All categories</ToggleButton>
            <ToggleButton value={Filters.PEOPLE}>People</ToggleButton>
            <ToggleButton value={Filters.PLANETS}>Planets</ToggleButton>
            <ToggleButton value={Filters.STARSHIPS}>Starships</ToggleButton>
          </ToggleButtonGroup>
          <div className="search-results">
            {
              searchResults.map(
                (result) => ((selectedFilter === Filters.ALL || selectedFilter === result.type)
                  ? (
                    <PreviewPanel
                      key={result.url}
                      name={result.name}
                      url={result.url}
                      type={result.type}
                    />
                  )
                  : null),
              )
            }
          </div>
        </div>
      );
  }
}

export default SearchResults;
