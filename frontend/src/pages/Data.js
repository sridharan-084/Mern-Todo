import React from "react";

const Data = ({ key, text, DeleteTask, UpdateTask }) => {
  return (
    <>
      <div className="container mt-3 data">
        <p>{text}</p>
        <div className="d-flex col justify-content-end p-2">
          <button type="button" class="btn btn-primary" onClick={UpdateTask}>
            Update
          </button>
          <button type="button" class="btn btn-danger" onClick={DeleteTask}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Data;
