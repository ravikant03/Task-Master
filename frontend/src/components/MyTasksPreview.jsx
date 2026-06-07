// components/MyTasksPreview.jsx

import { useEffect, useState } from "react";
import api from "../services/api";

const MyTasksPreview = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await api.get("/task");
      setTasks(data.data.slice(0, 5));
    };

    fetchTasks();
  }, []);

  return (
    <section className="py-16 px-10">
      <h2 className="text-3xl font-bold mb-8">Recent Tasks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length === 0 ? <p className="text-md md:text-3xl font-semibold capitalize">No Task To Show </p> :  tasks.map((task) => (
          <div key={task._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">{task.title}</h3>

            <p className="text-gray-600">{task.description}</p>

            <span>{task.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyTasksPreview;
