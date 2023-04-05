import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ToDoColumn } from './components/columns/ToDo';
import { InProgressColumn } from './components/columns/InProgress';
import { todoSlice as todo } from './redux/slice/todo';
import { inProgressSlice as inProgress } from './redux/slice/inProgress';
import { StoreState } from './redux/store';
import { IModel } from './types';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';


type TAllSlices = 'todo' | 'inProgress';

function App() {
  const dispatch = useDispatch();
  const appState = useSelector((state: StoreState) => state);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { destination, source, draggableId } = result;
    const allSlices = { todo, inProgress };

    if (destination.droppableId === source.droppableId) {
      dispatch(
        allSlices[destination.droppableId as TAllSlices].actions.reorder(result)
      );
    } else {
      const [filterState] = (
        (appState as any)[source.droppableId] as IModel[]
      ).filter(({ id }) => id === draggableId);

      dispatch(
        allSlices[source.droppableId as TAllSlices].actions.remove(draggableId)
      );
      dispatch(
        allSlices[destination.droppableId as TAllSlices].actions.update({
          ...result,
          filterState,
        })
      );
    }
  };

  return (
    <Container>
      <BrowserRouter>
        <NavBar />
        <Grid container justifyContent="center">
          <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
            <Grid item>
              <Routes>
                <Route path="/" element={<ToDoColumn />} />
                <Route path="schedule" element={<InProgressColumn />} />
              </Routes>
            </Grid>
          </DragDropContext>
        </Grid>
      </BrowserRouter>
    </Container>
  );
}

export default App;
