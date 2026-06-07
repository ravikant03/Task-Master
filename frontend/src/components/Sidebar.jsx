import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LogoutIcon from "@mui/icons-material/Logout";
import api from "../services/api";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { useSidebar } from "../context/SidebarContext";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

  const { open, closeSidebar } = useSidebar();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/task/dashboard",
    },
    {
      text: "Add Task",
      icon: <AddTaskIcon />,
      path: "/task",
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={closeSidebar}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton
            onClick={async () => {
              try {
                await api.post("auth/logout");
                localStorage.removeItem("token");
                toast.success("Logout Success.");
                navigate("/login");
              } catch (error) {
                toast.error("Something went wrong while logging out");
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
