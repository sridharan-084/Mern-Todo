import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { WorkoutContext } from "../context/workoutcontext";
const ProtectedHome = () => {
  // const { token, setToken } = useContext(WorkoutContext);
  // useEffect(() => {
  //   const token = localStorage.getItem("auth");
  //   setToken(token);
  // });
  const auth = localStorage.getItem("auth");

  return <>{auth ? <Navigate to="/"></Navigate> : <Outlet></Outlet>}</>;
};

export default ProtectedHome;
