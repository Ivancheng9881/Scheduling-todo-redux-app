import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { StoreDispatch } from "../redux/store";
import { IColumnLayoutProps } from "../types";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Typography } from "@mui/material";
const ColumnLayout: React.FC<IColumnLayoutProps> = ({
  labelText,
  addHandler,
  removeHandler,
  completedHandler,
  selectorState,
  droppableId,
  updateTextShowed,
  updateDuration,
}) => {
  const [isError, setIsError] = useState({
    isShow: false,
    text: "",
  });

  const [duration, setDuration] = useState(0);
  const [textDescription, setTextDescription] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);

    setIsError({
      isShow: value.length > 200,
      text:
        value.length > 200
          ? "The input value cannot be more than 200 characters"
          : "",
    });
  };

  const incrementDuration = () => {
    setDuration(duration + 1);
  };

  const decrementDuration = () => {
    if (duration > 0) {
      setDuration(duration - 1);
    }
  };

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  const handleOnClick = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription, duration));
      setTextDescription("");
      setDuration(0);
    }
  };

  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        handleOnClick();
      } else {
        setIsError({
          isShow: true,
          text: "The input value cannot be empty",
        });
      }
    }
  };

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{
              minHeight: "300px",
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
                { id, text, isFinished, createdAt, updatedAt, isTextShowed, duration },
                index: number
              ) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      sx={{
                        transition: ".3s ease background-color",
                        color: snapshot.isDragging ? "#fff" : "#000",
                        bgcolor: snapshot.isDragging ? "#000" : "#fff",
                        position: "relative",
                        my: 1,
                        borderRadius: "3px",
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
                        }}
                      >
                        <Checkbox
                          icon={<CheckCircleOutlineIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          edge="end"
                          value={isFinished}
                          checked={isFinished}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={() =>
                            dispatch(
                              completedHandler({
                                isFinished: !isFinished,
                                id,
                                updatedAt: new Date().toLocaleString(),
                              })
                            )
                          }
                        />
                        <IconButton
                          sx={{ p: 1, mr: 1 }}
                          onClick={() =>
                            dispatch(
                              updateTextShowed({
                                id,
                                isTextShowed: !isTextShowed,
                              })
                            )
                          }
                        >
                          <ArrowDownwardIcon
                            sx={{
                              color: snapshot.isDragging ? "#fff" : "#000",
                              transform: !isTextShowed ? "rotate(180deg)" : "",
                            }}
                          />
                        </IconButton>

                        <Box
                          component="span"
                          width="100%"
                          position="absolute"
                          top="0"
                          fontSize=".7rem"
                        >
                          {updatedAt ? "Updated" : "Created"} at:{" "}
                          {updatedAt || createdAt}
                        </Box>

                        <Box component="span" width="100%">
                          {text}
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
                          <IconButton onClick={decrementDuration}>
                            <IndeterminateCheckBoxOutlinedIcon />
                          </IconButton>
                          <Typography align="center">{duration}</Typography>
                          <IconButton onClick={incrementDuration}>
                            <AddBoxOutlinedIcon />
                          </IconButton>
                          <IconButton
                            onClick={handleOnClick}
                            onKeyDown={({ key }) =>
                              key === "Enter" && handleOnClick()
                            }
                            disabled={
                              textDescription.length === 0 ||
                              textDescription.length > 200
                            }
                          >
                            <KeyboardArrowRightOutlinedIcon />
                          </IconButton>
                        </Box>
                      </ListItemText>
                      <Collapse in={isTextShowed}>
                        You can add here some content{" "}
                        <span role="img" aria-label="emoji">
                          😍
                        </span>
                      </Collapse>
                    </ListItem>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <IconButton
            onClick={handleOnClick}
            onKeyDown={({ key }) => key === "Enter" && handleOnClick()}
            disabled={
              textDescription.length === 0 || textDescription.length > 200
            }
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item xs={7}>
          <TextField
            fullWidth
            label={labelText}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onKeyDown={handleInputKeyDown}
            value={textDescription}
            size="small"
            sx={{ border: "none", "& fieldset": { border: "none" } }}
          />
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" component="span">
            <IconButton onClick={decrementDuration}>
              <IndeterminateCheckBoxOutlinedIcon />
            </IconButton>
            <IconButton>{duration}</IconButton>
            <IconButton onClick={incrementDuration}>
              <AddBoxOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={handleOnClick}
              onKeyDown={({ key }) => key === "Enter" && handleOnClick()}
              disabled={
                textDescription.length === 0 || textDescription.length > 200
              }
            >
              <KeyboardArrowRightOutlinedIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ColumnLayout;
