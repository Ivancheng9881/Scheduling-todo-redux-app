import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { StoreDispatch } from "../redux/store";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Typography } from "@mui/material";
import { IScheduleLayoutProps } from "../types";

const ScheduleLayout: React.FC<IScheduleLayoutProps> = ({
  removeHandler,
  completedHandler,
  selectorState,
  droppableId,
  updateTextShowed,
  increment,
  decrement,
  schedule,
  scheduledTasks,
}) => {
  const [isError, setIsError] = useState({
    isShow: false,
    text: "",
  });

  const dispatch = useDispatch<StoreDispatch>();

  return (
    <Box width="100%" sx={{ boxShadow: 2, padding: "5px" }}>
      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{
              padding: "5px",
              minHeight: "450px",
              maxHeight: "450px",
              overflow: "auto",
              li: {
                flexDirection: "column",
              },
              "& .MuiListItemText-root": {
                width: "100%",
              },
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {selectorState.map(
              (
                { id, text, isFinished, createdAt, updatedAt, duration },
                index: number
              ) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      sx={{
                        transition: ".3s ease background-color",
                        color: snapshot.isDragging ? "#fff" : "#000",
                        bgcolor: snapshot.isDragging ? "#565554" : "#F6F5AE",
                        position: "relative",
                        my: 1,
                        paddingLeft: "0px ! important",
                        "& .MuiTypography-root": {
                          display: "flex",
                          alignItems: "center",
                        },
                      }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItemText
                        sx={{
                          textDecoration: isFinished ? "line-through" : "none",
                          wordBreak: "break-word",
                          font: snapshot.isDragging ? "#fff" : "#000",
                        }}
                      >
                        <Checkbox
                          icon={<CheckCircleOutlineIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          edge="end"
                          value={isFinished}
                          checked={isFinished}
                          inputProps={{ "aria-label": "controlled" }}
                          sx={{
                            color: snapshot.isDragging ? "#fff" : "#000",
                          }}
                          onChange={() =>
                            dispatch(
                              completedHandler({
                                isFinished: !isFinished,
                                id,
                                duration,
                                updatedAt: new Date().toLocaleString(),
                              })
                            )
                          }
                        />
                        <Box
                          component="span"
                          width="95%"
                          position="absolute"
                          top="3px"
                          left="10px"
                          fontSize=".6rem"
                        >
                          {updatedAt ? "Updated" : "Created"} at:{" "}
                          {updatedAt || createdAt}
                        </Box>
                        <Box component="span" width="100%">
                          <TextField
                            fullWidth
                            onChange={(e) =>
                              dispatch(
                                updateTextShowed({
                                  id,
                                  text: e.target.value,
                                  duration,
                                  isFinished,
                                })
                              )
                            }
                            value={text}
                            size="small"
                            sx={{
                              border: "none",
                              "& fieldset": { border: "none" },
                              input: {
                                color: snapshot.isDragging ? "#fff" : "#000",
                              },
                            }}
                          />
                        </Box>
                        <Box display="flex" component="span">
                          <IconButton
                            onClick={() => dispatch(removeHandler(id))}
                          >
                            <DeleteIcon
                              sx={{
                                color: snapshot.isDragging ? "#fff" : "#000",
                              }}
                            />
                          </IconButton>
                        </Box>
                        <Box display="flex" component="span">
                          <IconButton
                            sx={{
                              color: snapshot.isDragging ? "#fff" : "#000",
                            }}
                            onClick={() => dispatch(decrement(id))}
                          >
                            <IndeterminateCheckBoxOutlinedIcon />
                          </IconButton>
                          <Typography align="center">{duration}</Typography>
                          <IconButton
                            sx={{
                              color: snapshot.isDragging ? "#fff" : "#000",
                            }}
                            onClick={() => dispatch(increment(id))}
                          >
                            <AddBoxOutlinedIcon />
                          </IconButton>
                          <IconButton onClick={() => dispatch(schedule(id))}>
                            <KeyboardArrowRightOutlinedIcon
                              sx={{
                                color: snapshot.isDragging ? "#fff" : "#000",
                              }}
                            />
                          </IconButton>
                        </Box>
                      </ListItemText>
                    </ListItem>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Box>
  );
};

export default ScheduleLayout;
