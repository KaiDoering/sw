/* eslint-disable no-param-reassign */

import { IPeople, IPlanet, Planets } from 'swapi-ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import States from '../States';

import { getIdFromUrl } from '../util/StringUtils';

interface PlanetsSliceState {
  status: States;
  // Overriding residents as they are typed as either url or populated data
  data: Omit<IPlanet, 'created' | 'edited' | 'residents'> & { residents: IPeople[] };
}

const initialState: PlanetsSliceState = {
  status: States.INITIAL,
  data: {
    climate: '',
    diameter: '',
    films: [],
    gravity: '',
    name: '',
    orbital_period: '',
    population: '',
    residents: [],
    rotation_period: '',
    surface_water: '',
    terrain: '',
    url: '',
  },
};

/**
 * Fetches planet data using swapi-ts
 */
export const fetchPlanetData = createAsyncThunk(
  'planets/fetch',
  async (id?: string) => {
    if (!id) {
      return initialState;
    }
    const result = await Planets.find((planet) => planet.url.endsWith(`/${id}/`))
      .then((planets) => planets.populateAll('residents'))
      .then((planets) => planets.resources[0].value)
      .then((data) => ({
        ...data,
        residents: data.residents.map(
          (resident: IPeople) => ({ ...resident, url: `/people/${getIdFromUrl(resident.url)}` }),
        ),
      }));
    return result;
  },
);

const PlanetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlanetData.pending, (state) => {
        state.status = States.LOADING;
      })
      .addCase(fetchPlanetData.fulfilled, (state, action) => {
        state.status = States.LOADED;
        state.data = action.payload;
      })
      .addCase(fetchPlanetData.rejected, (state) => {
        state.status = States.ERROR;
      });
  },
});

export default PlanetsSlice.reducer;
