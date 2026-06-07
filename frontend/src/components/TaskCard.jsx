import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update/${task._id}`);
  };

  const handleDelete = async () => {
    const response = await api.delete(`/task/${task._id}`);
    toast.success(response.data?.message);
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 flex flex-col gap-3">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {task.title || "title"}
      </h3>

      {/* Description (3 lines max, rest shows …) */}
      <p className="text-gray-600 text-sm line-clamp-3">
        {task.description || "Description"}
      </p>

      {/* Buttons stacked below */}
      <div className="flex justify-between gap-2">
        <button
          onClick={handleUpdate}
          className="w-20 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="w-20 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
