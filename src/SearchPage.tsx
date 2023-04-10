import './SearchPage.scss';

import React, { ChangeEvent, useCallback, useState } from 'react';

import { debounce, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import Filters from './Filters';
import SearchResults from './SearchResults';

import { useAppDispatch } from './hooks/redux';
import { searchRequest } from './redux/SearchSlice';

function SearchPage() {
  const [selectedFilter, setSelectedFilter] = useState(Filters.ALL);
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSelectedFilter(Filters.ALL);
      dispatch(searchRequest(event.target.value));
    }, 500),
    [],
  );

  const onChangeFilter = useCallback(
    (_: unknown, value: Filters) => setSelectedFilter(value),
    [],
  );

  return (
    <div className="search-page-container">
      <TextField
        type="input"
        fullWidth
        onChange={onChange}
        placeholder="Search for people/planets/starships"
        InputProps={{
          endAdornment: <Search />,
        }}
      />
      <SearchResults selectedFilter={selectedFilter} onChangeFilter={onChangeFilter} />
    </div>
  );
}

export default SearchPage;
