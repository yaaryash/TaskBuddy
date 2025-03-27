import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import TaskInput from "./TaskInput";
import dayjs from "dayjs";
import { ReactComponent as IconInBlack } from "../assests/images/iconInBlack.svg";
import { ReactComponent as ListIcon } from "../assests/images/listIcon.svg";
import { ReactComponent as BoardIcon } from "../assests/images/boardIcon.svg";
import { ReactComponent as LogoutIcon } from "../assests/images/logoutButton.svg";
import "@fontsource/mulish/300.css";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/700.css";

const TaskListView = () => {
  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || {};

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusAnchor, setStatusAnchor] = useState(null);
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleMenuClick = (event, task) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTask(task);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedTask(null);
  };

  const handleLogout = () => {
    navigate("/login"); 
  };
  const handleAddTask = () => {
    setOpenTaskModal((prev) => !prev);
    setTaskTitle("");
    setSelectedDate(null);
    setSelectedStatus("");
    setSelectedCategory("");
    setStatusAnchor(null);
    setCategoryAnchor(null);
  };

  const handleAddTaskToList = () => {
    tasks.push({
      id: tasks.length + 1,
      name: taskTitle,
      due: selectedDate ? dayjs(selectedDate).format("D MMM, YYYY") : "Today",
      status: selectedStatus,
      category: selectedCategory,
    });
    setTasks([...tasks]);
    setOpenTaskModal(false);
    setTaskTitle("");
    setSelectedDate(null);
    setSelectedStatus("");
    setSelectedCategory("");
    setStatusAnchor(null);
    setCategoryAnchor(null);
  };
  console.log("TaskInput", tasks);
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container direction="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <IconInBlack />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "140%",
                ml: 1,
                fontFamily: '"Mulish", sans-serif',
                color: "#2F2F2F",
              }}
            >
              TaskBuddy
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">

            <Typography
              sx={{
                fontSize: "16px",
                ml: 1,
                fontFamily: '"Mulish", sans-serif',
                color: "#00000099",
                mr: 1,
              }}
            >
              {user.displayName}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mt={2} justifyContent="space-between">
          <Box>
            <Button
              startIcon={<ListIcon />}
              variant="text"
              mr={2}
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "140%",
                fontFamily: '"Mulish", sans-serif',
                color: "#231F20D1",
              }}
            >
              List
            </Button>
            <Button
              variant="text"
              ml={2}
              startIcon={<BoardIcon />}
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "140%",
                ml: 1,
                fontFamily: '"Mulish", sans-serif',
                color: "#231F20D1",
              }}
            >
              Board
            </Button>
          </Box>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            start
            sx={{
              fontWeight: "600",
              width: "108px",
              height: "40px",
              borderRadius: "12px",
              fontSize: "16px",
              lineHeight: "140%",
              ml: 1,
              fontFamily: '"Mulish", sans-serif',
              color: "#231F20D1",
              borderColor: "#7B198426",
              bgcolor: "#FFF9F9",
            }}
            onClick={handleLogout}
          >
            <Typography
              sx={{
                fontWeight: "600",
                height: "15px",
                borderRadius: "12px",
                textAlign: "center",
                fontSize: "12px",
                lineHeight: "140%",
                // ml: 1,
                fontFamily: '"Mulish", sans-serif',
                color: "#231F20D1",
                textTransform: "none",
              }}
            >
              Logout
            </Typography>
          </Button>
        </Box>

        <Box display="flex" gap={2} justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              sx={{
                fontWeight: "600",
                height: "17px",
                borderRadius: "60px",
                textAlign: "center",
                fontSize: "12px",
                lineHeight: "140%",
                // ml: 1,
                fontFamily: '"Mulish", sans-serif',
                color: "#00000099",
                textTransform: "none",
              }}
            >
              Filter by:
            </Typography>
            <TextField
              select
              size="small"
              defaultValue="Category"
              sx={{
                fontWeight: "600",
                borderRadius: "60px",
                fontSize: "12px",
                fontFamily: '"Mulish", sans-serif',
                color: "#00000099",
                textTransform: "none",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "60px",
                  mr: 1,
                },
              }}
            >
              <MenuItem value="Category">Category</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              defaultValue="Due Date"
              sx={{
                fontWeight: "600",
                borderRadius: "60px",
                fontSize: "12px",
                fontFamily: '"Mulish", sans-serif',
                color: "#00000099",
                textTransform: "none",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "60px",
                  mr: 1,
                },
              }}
            >
              <MenuItem value="Due Date">Due Date</MenuItem>
            </TextField>
          </Box>
          <Box>
            <TextField
              placeholder="Search"
              size="small"
              InputProps={{ startAdornment: <SearchIcon /> }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "60px",
                  mr: 1,
                },
              }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#7B1984", borderRadius: "60px" }}
            >
              ADD TASK
            </Button>
          </Box>
        </Box>
      </Grid>

      {["To-do", "In-Progress", "Completed"].map((section, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor:
                index === 0 ? "#FAC3FF" : index === 1 ? "#85D9F1" : "#CEFFCC",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {section} (
              {
                tasks.filter(
                  (t) => t.status.toUpperCase() === section.toUpperCase()
                ).length
              }
              )
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section === "To-do" && (
              <>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#7B1984" }}
                  onClick={handleAddTask}
                >
                  ADD TASK
                </Button>
              </>
            )}
            {openTaskModal && section === "To-do" && (
              <Box>
                <TaskInput
                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categoryAnchor={categoryAnchor}
                  setCategoryAnchor={setCategoryAnchor}
                  statusAnchor={statusAnchor}
                  setStatusAnchor={setStatusAnchor}
                  handleAddTaskToList={handleAddTaskToList}
                />
              </Box>
            )}
            {tasks.filter(
              (task) => task.status.toUpperCase() === section.toUpperCase()
            ).length > 0 ? (
              tasks
                .filter(
                  (task) => task.status.toUpperCase() === section.toUpperCase()
                )
                .map((task) => (
                  <Grid
                    container
                    alignItems="center"
                    key={task.id}
                    sx={{ padding: 1, borderBottom: "1px solid #ddd" }}
                  >
                    <Typography sx={{ flex: 3 }}>{task.name}</Typography>
                    <Typography sx={{ flex: 2 }}>{task.due}</Typography>
                    <Typography sx={{ flex: 2 }}>{task.status}</Typography>
                    <Typography sx={{ flex: 2 }}>{task.category}</Typography>
                    <IconButton onClick={(e) => handleMenuClick(e, task)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                ))
            ) : (
              <Typography sx={{ textAlign: "center", color: "#888" }}>
                No Tasks in {section}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem sx={{ color: "red" }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskListView;
