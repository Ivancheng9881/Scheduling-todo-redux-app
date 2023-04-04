import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TActionSlice, TUpdateTextShowed, IModel } from '../../types';

const initialState: IModel[] = [];

export const createCustomSlice = (name: string) => {
  const {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed, updateDuration },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload);
        },
        prepare: (text: string, duration: number) => ({
          payload: {
            id: uuidv4(),
            text,
            isFinished: false,
            createdAt: new Date().toLocaleString(),
            isTextShowed: false,
            duration
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
        state.splice(index, 1);
      },
      completeStatus(state, action: PayloadAction<TActionSlice>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isFinished = action.payload.isFinished;
        state[index].updatedAt = action.payload.updatedAt;
      },
      updateTextShowed(state, action: PayloadAction<TUpdateTextShowed>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isTextShowed = action.payload.isTextShowed;
      },
      reorder(state, action) {
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
      updateDuration(state, action) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].duration = action.payload.updateDuration;
      }
    },
  });

  return {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed, updateDuration },
    reducer,
  };
};
