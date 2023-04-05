import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { todoSlice } from '../../redux/slice/todo';
import ColumnLayout from '../ColumnLayout';
import { IModel } from '../../types';

export function ToDoColumn() {
  const { todo } = useSelector((state: StoreState) => state);
  const totalDuration = (todoArr: IModel[]): number => {
    return todoArr.reduce((acc, curr) => acc + curr.duration, 0);
  }

  const {
    actions: {
      completeStatus,
      remove,
      add,
      updateTextShowed,
      increment,
      decrement,
      schedule
    }
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
        totalToDoTasks={todo.length}
        totalDuration={totalDuration(todo)}
        schedule={schedule}
      />
    </>
  );
}
