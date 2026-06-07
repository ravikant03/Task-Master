// components/Hero.jsx

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
   <section className="text-center py-12 md:py-20 px-4">
  <h1 className="text-3xl md:text-5xl font-bold mb-4">
    Organize Your Tasks Efficiently
  </h1>

  <p className="text-gray-600 mb-6 text-sm md:text-lg">
    Manage, track and complete tasks with ease.
  </p>

  <button className="bg-blue-600 text-white px-6 py-3 rounded"  onClick={() => navigate("/task")}>
    Create Task
  </button>
</section>
  );
};

export default Hero;