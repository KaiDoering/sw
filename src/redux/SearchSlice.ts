/* eslint-disable no-param-reassign */

import { People, Planets, Starships } from 'swapi-ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import States from '../States';
import Filters from '../Filters';

import { getIdFromUrl } from '../util/StringUtils';
import { sortBy } from '../util/ArrayUtils';

interface SearchResult {
  name: string;
  url: string;
  type: Filters;
}

interface SearchSliceState {
  status: States;
  results: SearchResult[];
}

const initialState: SearchSliceState = {
  status: States.INITIAL,
  results: [],
};

/**
 * Does a search request using swapi-ts
 */
export const searchRequest = createAsyncThunk(
  'search/request',
  async (query: string) => {
    const people = await People.findBySearch([query])
      .then((response) => response.resources)
      .then((list) => list.map((entry) => ({
        ...entry.value,
        url: `/people/${getIdFromUrl(entry.value.url)}`,
        type: Filters.PEOPLE,
      })));

    const planets = await Planets.findBySearch([query])
      .then((response) => response.resources)
      .then((list) => list.map((entry) => ({
        ...entry.value,
        url: `/planets/${getIdFromUrl(entry.value.url)}`,
        type: Filters.PLANETS,
      })));

    const starships = await Starships.findBySearch([query])
      .then((response) => response.resources)
      .then((list) => list.map((entry) => ({
        ...entry.value,
        url: `/starships/${getIdFromUrl(entry.value.url)}`,
        type: Filters.STARSHIPS,
      })));

    return [...people, ...planets, ...starships].map((entry) => ({
      name: entry.name,
      url: entry.url,
      type: entry.type,
    })).sort(sortBy('name'));
  },
);

/**
 * swapi-ts is caching everything in local storage, so we don't have to worry about that here
 */
const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchRequest.pending, (state) => {
        state.status = States.LOADING;
      })
      .addCase(searchRequest.fulfilled, (state, action) => {
        state.status = States.LOADED;
        state.results = action.payload;
      })
      .addCase(searchRequest.rejected, (state) => {
        state.status = States.ERROR;
      });
  },
});

export default SearchSlice.reducer;
