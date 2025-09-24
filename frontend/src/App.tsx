import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Default: go to login if not logged in, else go to dashboard */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      {/* Auth routes */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
      />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Fallback: redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
