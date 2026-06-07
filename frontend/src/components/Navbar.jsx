// components/Navbar.jsx

import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MenuIcon from "@mui/icons-material/Menu";

import { useSidebar } from "../context/SidebarContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();

  return (
    <nav className="flex  justify-between items-center px-4 md:px-8 py-4 shadow-md gap-4">
      <h1 className="text-2xl font-bold">Task Master</h1>
      <div className="md:hidden" onClick={toggleSidebar}>
        <MenuIcon />
      </div>

      <div className="hidden md:flex flex-wrap justify-center items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/task/dashboard">Dashboard</Link>
        <Link to="/task">Add Task</Link>
        <button
          className="font-medium border px-2 rounded bg-blue-500 text-white py-1 cursor-pointer"
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
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
