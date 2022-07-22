import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Nav = ({ status, setStatus }) => {
  const logout = () => {
    console.log("clicked");
    localStorage.clear();
    setStatus(false);
    Navigate("/login");
  };

  return (
    <div className="nav d-flex justify-content-between">
      {status ? (
        <>
          <h1 className="text-dark display-6 p-2">
            Welcome {localStorage.getItem("username")} 👋
          </h1>
          <button type="button" class="btn btn-light" onClick={() => logout()}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="text-dark  p-2">Task List 📝 </h1>
        </>
      )}
    </div>
  );
};

export default Nav;
