/* eslint-disable no-param-reassign */

import { IPeople, IStarship, Starships } from 'swapi-ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import States from '../States';

import { getIdFromUrl } from '../util/StringUtils';

interface StarshipsSliceState {
  status: States;
  // Overriding pilots as they will be populated with data
  data: Omit<IStarship, 'created' | 'edited' | 'pilots'> & { pilots: IPeople[] };
}

const initialState: StarshipsSliceState = {
  status: States.INITIAL,
  data: {
    MGLT: '',
    cargo_capacity: '',
    consumables: '',
    cost_in_credits: '',
    crew: '',
    hyperdrive_rating: '',
    length: '',
    manufacturer: '',
    max_atmosphering_speed: '',
    model: '',
    name: '',
    passengers: '',
    films: [],
    pilots: [],
    starship_class: '',
    url: '',
  },
};

/**
 * Fetches starship data using swapi-ts
 */
export const fetchStarshipData = createAsyncThunk(
  'starships/fetch',
  async (id?: string) => {
    if (!id) {
      return initialState;
    }
    const result = await Starships.find((ship) => ship.url.endsWith(`/${id}/`))
      .then((ships) => ships.populateAll('pilots'))
      .then((ships) => ships.resources[0].value)
      .then((data) => ({
        ...data,
        pilots: data.pilots.map(
          (pilot: IPeople) => ({ ...pilot, url: `/people/${getIdFromUrl(pilot.url)}` }),
        ),
      }));
    return result;
  },
);

const StarshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStarshipData.pending, (state) => {
        state.status = States.LOADING;
      })
      .addCase(fetchStarshipData.fulfilled, (state, action) => {
        state.status = States.LOADED;
        state.data = action.payload;
      })
      .addCase(fetchStarshipData.rejected, (state) => {
        state.status = States.ERROR;
      });
  },
});

export default StarshipsSlice.reducer;
