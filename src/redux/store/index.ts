import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { inProgressSlice } from '../slice/inProgress';
import { todoSlice } from '../slice/todo';

export const store = configureStore({
  reducer: combineReducers({
    inProgress: inProgressSlice.reducer,
    todo: todoSlice.reducer,
  }),
});

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
