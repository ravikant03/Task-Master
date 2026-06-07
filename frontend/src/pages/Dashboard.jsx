import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api";
import { useState, useEffect, useCallback } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = useCallback(async () => {
    const { data } = await api.get("/task");
    setTasks(data.data);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 180,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.toUpperCase()}
          color={params.value === "completed" ? "success" : "warning"}
          variant="filled"
          clickable
          onClick={async () => {
            try {
              await api.patch(`/task/toggle-status/${params.row.id}`);
              toast.success("Status changed successfully");
              fetchTasks();
            } catch (error) {
              toast.error("Failed to change status");
            }
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => navigate(`/update/${params.row.id}`)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={async () => {
              try {
                await api.delete(`/task/${params.row.id}`);
                toast.success("Task deleted successfully");
                fetchTasks();
              } catch (error) {
                toast.error("Failed to delete task");
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = filteredTasks.map((task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
  }));

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Task Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and track your tasks efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm uppercase">
              Total Tasks
            </h3>

            <p className="text-4xl font-bold mt-2">
              {tasks.length}
            </p>
          </div>

          <div className="bg-green-50 rounded-xl shadow-md p-6">
            <h3 className="text-green-600 text-sm uppercase">
              Completed
            </h3>

            <p className="text-4xl font-bold mt-2">
              {completedTasks}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl shadow-md p-6">
            <h3 className="text-yellow-600 text-sm uppercase">
              Pending
            </h3>

            <p className="text-4xl font-bold mt-2">
              {pendingTasks}
            </p>
          </div>
        </div>

        {/* Search & Add */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
          <TextField
            label="Search Tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                sm: 320,
              },
            }}
          />

          <Chip
            label="Add Task"
            color="primary"
            clickable
            onClick={() => navigate("/task")}
          />
        </div>

        {/* Data Grid */}
        <Box
          sx={{
            height: 550,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: 2,
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                fontWeight: 700,
                fontSize: "15px",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "14px",
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;