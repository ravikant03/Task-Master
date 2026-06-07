import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskForm from "./pages/TaskForm";
import HomePage from "./pages/HomePage";
import UpdateTask from "./pages/UpdateTask";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import OtpPage from "./pages/Otp";

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpPage/>} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/task" element={<TaskForm />} />
            <Route path="/update/:id" element={<UpdateTask />} />
            <Route path="/task/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
