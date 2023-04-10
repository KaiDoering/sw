/* eslint-disable no-param-reassign */

import { IPeople, IStarship, People } from 'swapi-ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import States from '../States';

import { getIdFromUrl } from '../util/StringUtils';

interface PeopleSliceState {
  status: States;
  // dropping unused types and overriding types we will populate with more data
  data: Omit<IPeople, 'created' | 'edited' | 'starships' | 'homeworld'> & {
    homeworld: {
      url: string,
      name: string,
    },
    starships: IStarship[],
  };
}

const initialState: PeopleSliceState = {
  status: States.INITIAL,
  data: {
    birth_year: '',
    eye_color: '',
    films: [],
    gender: '',
    hair_color: '',
    height: '',
    homeworld: {
      name: '',
      url: '',
    },
    mass: '',
    name: '',
    skin_color: '',
    species: [],
    starships: [],
    url: '',
    vehicles: [],
  },
};

/**
 * Fetches people data using swapi-ts
 */
export const fetchPeopleData = createAsyncThunk(
  'people/fetch',
  async (id?: string) => {
    if (!id) {
      return initialState;
    }
    const result = await People.find((individual) => individual.url.endsWith(`/${id}/`))
      .then((people) => people.populateAll('starships'))
      .then((people) => people.populateAll('homeworld'))
      .then((people) => people.resources[0].value)
      .then((data) => ({
        ...data,
        homeworld: {
          name: data.homeworld.name,
          url: `/planets/${getIdFromUrl(data.homeworld.url)}`,
        },
        starships: data.starships.map(
          (ship: IStarship) => ({ ...ship, url: `/starships/${getIdFromUrl(ship.url)}` }),
        ),
      }));
    return result;
  },
);

const PeopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPeopleData.pending, (state) => {
        state.status = States.LOADING;
      })
      .addCase(fetchPeopleData.fulfilled, (state, action) => {
        state.status = States.LOADED;
        state.data = action.payload;
      })
      .addCase(fetchPeopleData.rejected, (state) => {
        state.status = States.ERROR;
      });
  },
});

export default PeopleSlice.reducer;
