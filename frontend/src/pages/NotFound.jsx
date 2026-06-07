import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl md:text-9xl font-bold text-blue-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-gray-800 text-center">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-500 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;