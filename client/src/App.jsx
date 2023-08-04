import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/slices/authSlice";

//Pages
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Regsiter.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TaskHome from "./pages/TaskHome.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";
import ViewTask from "./pages/ViewTask.jsx";
import NotFound from "./pages/NotFound.jsx";

//Middlewares
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import AuthRoutes from "./middlewares/AuthRoutes";

//Api
import { refreshToken } from "./services/auth/api.auth"

const TokenRefreshInterval = 60 * 60 * 1000; // Refresh token every 60 minutes (adjust as needed)

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    let intervalId;

    const refreshTokenHandler = async () => {
      try {
        if (isLoggedIn) {
          const refreshTokenFromStorage = localStorage.getItem("refreshToken");
          const response = await refreshToken(refreshTokenFromStorage);

          // Assuming the refreshToken function returns an object containing the new access token and refresh token
          localStorage.setItem("token", response.token);
          localStorage.setItem("refreshToken", response.refreshToken);

          // isLoggedIn => TRUE
          dispatch(authActions.login());
        }
      } catch (error) {
        console.error("Token refresh failed:", error.message);
        // Handle the error as needed, e.g., log out the user or show an error message
      }
    };

    // Call the refresh token handler immediately upon mounting
    refreshTokenHandler();

    // Set up the interval to refresh the token periodically
    intervalId = setInterval(refreshTokenHandler, TokenRefreshInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>

          //AUTH
          <Route element={<AuthRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          //Task Panel
          <Route element={<ProtectedRoutes />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/task" element={<TaskHome />} />
            <Route path="/user/task/new" element={<CreateTask />} />
            <Route path="/user/task/edit/:id" element={<EditTask />} />
            <Route path="/user/task/show/:id" element={<ViewTask />} />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
