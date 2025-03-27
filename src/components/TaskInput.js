import React, { useState } from "react";
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Dialog,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TaskInput = ({
  taskTitle,
  setTaskTitle,
  selectedDate,
  setSelectedDate,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  statusAnchor,
  setStatusAnchor,
  categoryAnchor,
  setCategoryAnchor,
  handleAddTaskToList,
}) => {
  const [open, setOpen] = useState(false);

  const handleStatusClick = (event) => setStatusAnchor(event.currentTarget);
  const handleStatusClose = (status) => {
    if (status) setSelectedStatus(status);
    setStatusAnchor(null);
  };

  const handleCategoryClick = (event) => setCategoryAnchor(event.currentTarget);
  const handleCategoryClose = (category) => {
    if (category) setSelectedCategory(category);
    setCategoryAnchor(null);
  };

  const getDisplayDate = (date) => {
    if (!date) return "Pick Date";

    const today = dayjs().startOf("day");
    const selected = dayjs(date).startOf("day");

    if (selected.isSame(today, "day")) return "Today";
    if (selected.isSame(today.subtract(1, "day"), "day")) return "Yesterday";
    if (selected.isSame(today.add(1, "day"), "day")) return "Tomorrow";

    return dayjs(date).format("YYYY-MM-DD");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        <Box sx={{ width: "20%" }}>
          <TextField
            placeholder="Task Title"
            variant="standard"
            size="small"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {selectedDate ? (
              dayjs(selectedDate).format("D MMM, YYYY")
            ) : (
              <Button variant="contained" onClick={() => setOpen(true)}>
                {getDisplayDate(selectedDate)}
              </Button>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
              <MobileDatePicker
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setOpen(false);
                }}
              />
            </Dialog>
          </LocalizationProvider>
        </Box>
        <Box sx={{ width: "20%" }}>
          <div>
            {selectedStatus ? (
              <span>{selectedStatus}</span>
            ) : (
              <>
                <IconButton onClick={handleStatusClick}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Menu
                  anchorEl={statusAnchor}
                  open={Boolean(statusAnchor)}
                  onClose={() => handleStatusClose(null)}
                >
                  <MenuItem onClick={() => handleStatusClose("TO-DO")}>
                    TO-DO
                  </MenuItem>
                  <MenuItem onClick={() => handleStatusClose("IN-PROGRESS")}>
                    IN-PROGRESS
                  </MenuItem>
                  <MenuItem onClick={() => handleStatusClose("COMPLETED")}>
                    COMPLETED
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Box>
        <Box sx={{ width: "20%" }}>
          <div>
            {selectedCategory ? (
              <span>{selectedCategory}</span>
            ) : (
              <>
                <IconButton onClick={handleCategoryClick}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Menu
                  anchorEl={categoryAnchor}
                  open={Boolean(categoryAnchor)}
                  onClose={() => handleCategoryClose(null)}
                >
                  <MenuItem onClick={() => handleCategoryClose("WORK")}>
                    WORK
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryClose("PERSONAL")}>
                    PERSONAL
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Box>
      </div>
      <Grid>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleAddTaskToList()}
        >
          ADD ↩
        </Button>
        <Button variant="outlined">CANCEL</Button>
      </Grid>
    </>
  );
};

export default TaskInput;
