import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TActionSlice, IModel } from '../../types';

const initialState: IModel[] = [];

export const createCustomSlice = (name: string) => {
  const {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed, increment, decrement },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload);
        },
        prepare: (text: string, duration: number ) => ({
          payload: {
            id: uuidv4(),
            text,
            isFinished: false,
            duration,
            createdAt: new Date().toLocaleString(),
            isTextShowed: false,
          } as IModel
        }),
      },
      update(state, action) {
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      remove(state, action: PayloadAction<string>) {
        const index = state.findIndex(({ id }) => id === action.payload);
        console.log(index);
        state.splice(index, 1);
      },
      completeStatus(state, action: PayloadAction<TActionSlice>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isFinished = action.payload.isFinished;
        state[index].updatedAt = action.payload.updatedAt;
      },
      updateTextShowed(state, action: PayloadAction<IModel>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].text = action.payload.text;
      },
      reorder(state, action) {
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
      increment(state, action) {
        const index = state.findIndex(({ id }) => id === action.payload);
        console.log(state[index].duration)
        state[index].duration = state[index].duration + 1;
      },
      decrement(state, action) {
        const index = state.findIndex(({ id }) => id === action.payload);
        if (state[index].duration > 0) {
          state[index].duration = state[index].duration - 1;
        }
      }
  }});

  return {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed, increment, decrement },
    reducer,
  };
};
