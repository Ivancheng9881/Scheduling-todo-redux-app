import { AnyAction } from '@reduxjs/toolkit';

export interface IModel {
  id: string;
  text: string;
  isFinished: boolean;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
  isTextShowed?: boolean;
}

export type TActionSlice = Omit<IModel, 'text'>;
export type TUpdateTextShowed = Omit<TActionSlice, 'isFinished'>;

export interface IColumnLayoutProps {
  labelText?: string;
  addHandler: (v: string, k: number) => AnyAction;
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: TActionSlice) => AnyAction;
  selectorState: IModel[];
  droppableId: string;
  updateTextShowed: (v: string, k: string) => AnyAction;
  increment: (v: string) => AnyAction;
  decrement: (v: string) => AnyAction;
}
