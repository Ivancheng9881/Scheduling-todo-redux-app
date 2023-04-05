import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { todoSlice } from '../../redux/slice/todo';
import ColumnLayout from '../ColumnLayout';

export function ToDoColumn() {
  const { todo } = useSelector((state: StoreState) => state);
  
  const {
    actions: { completeStatus, remove, add, updateTextShowed, increment, decrement },
  } = todoSlice;

  return (
    <>
      <Typography mb={6}>To-do list</Typography>
      <ColumnLayout
        droppableId="todo"
        labelText="Type 'to do' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={todo}
        updateTextShowed={updateTextShowed}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
}
