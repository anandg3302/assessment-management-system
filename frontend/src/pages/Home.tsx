// src/pages/Home.tsx
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center w-full max-w-md">
        <h1 className="text-5xl font-bold mb-12">Welcome to Assessment System</h1>
        {isLoggedIn ? (
          <Link
            to="/dashboard"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/login"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
