import { configureStore } from '@reduxjs/toolkit';

import SearchSlice from './SearchSlice';
import PeopleSlice from './PeopleSlice';
import PlanetsSlice from './PlanetsSlice';
import StarshipsSlice from './StarshipsSlice';

const Store = configureStore({
  reducer: {
    search: SearchSlice,
    people: PeopleSlice,
    planets: PlanetsSlice,
    starships: StarshipsSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
