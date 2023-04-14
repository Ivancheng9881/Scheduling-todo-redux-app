import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { inProgressSlice } from "../../redux/slice/inProgress";
import ScheduleLayout from "../ScheduleLayout";
import { Typography } from "@mui/material";
import { IModel } from "../../types";

export function InProgressColumn() {
  const { todo } = useSelector((state: StoreState) => state);
  const scheduledTasks = (todoArr: IModel[]): IModel[] => {
    return todoArr;
  };

  const separateTasks = (scheduledTasks: IModel[]) => {
    let randomArr: IModel[][] = [];
    let miniArr: IModel[] = [];
    let counter = 0;
    for (let i = 0; i < scheduledTasks.length; i++) {
      console.log(scheduledTasks[i].duration);
      if (scheduledTasks[i].duration + counter < 8) {
        counter = counter + scheduledTasks[i].duration;
        miniArr.push(scheduledTasks[i]);
        console.log({ miniArr });
      } else if (scheduledTasks[i].duration + counter > 8) {
        randomArr.push(miniArr);
        miniArr = [];
        miniArr.push(scheduledTasks[i]);
        counter = 0;
        counter = counter + scheduledTasks[i].duration;
      } else {
        miniArr.push(scheduledTasks[i]);
        randomArr.push(miniArr);
        counter = 0;
        miniArr = [];
      }

      if (i === (scheduledTasks.length - 1)) {
        randomArr.push(miniArr);
      }
    }
    return randomArr;
  };

  console.log(separateTasks(todo));

  const {
    actions: {
      completeStatus,
      remove,
      add,
      updateTextShowed,
      increment,
      decrement,
      schedule,
    },
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
