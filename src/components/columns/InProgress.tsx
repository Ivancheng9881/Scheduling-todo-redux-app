import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { inProgressSlice } from '../../redux/slice/inProgress';
import ScheduleLayout from '../ScheduleLayout';
import { Typography } from '@mui/material';
import { IModel } from '../../types';

export function InProgressColumn() {
  const { todo } = useSelector((state: StoreState) => state);
  const scheduledTasks = (todoArr: IModel[]): IModel[] => {
    return todoArr.filter((e) => e.isScheduled === true);
  };

  const {
    actions: { completeStatus, remove, add, updateTextShowed, increment, decrement, schedule },
  } = inProgressSlice;

  return (
    <>
      <Typography mb={6}>Schedule</Typography>
      <ScheduleLayout
        droppableId="progress"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={todo}
        updateTextShowed={updateTextShowed}
        increment={increment}
        decrement={decrement}
        schedule={schedule}
        scheduledTasks={scheduledTasks(todo)}
      />
    </>
  );
}
