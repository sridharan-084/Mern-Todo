import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "bootstrap";
import Data from "./Data";
import Nav from "./Nav";
const Home = ({ status }) => {
  const [userData, setUserData] = useState();
  const [task, setTask] = useState("");
  const [btn, setBtn] = useState("ADD");
  const [eleId, seteleId] = useState(); // i am using it for the updation purpose ....//

  // jab home page par aaega toh ye useeffect ek bar chlega taki sab kuch set ho jaye ...
  useEffect(() => {
    const getItem = async () => {
      const headers = {
        auth: localStorage.getItem("auth"),
      };
      try {
        const id = localStorage.getItem("user");
        const response = await axios.post(
          "http://localhost:4000/todo/item",
          {
            UserId: id,
          },
          { headers }
        );
        // console.log(response.data.data[0]);
        setUserData(response.data.data);
        status(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    getItem();
  }, []);

  // ye vala function hai jab bhi koi banda add data pr touch karega toh ye function call hoga ... //
  const AddTask = async (btn) => {
    if (task === "" && btn === "ADD") {
      return;
    } else if (btn === "UPDATE") {
      // ye vala update ke liye hai through same button ..... ///
      try {
        const headers = {
          auth: localStorage.getItem("auth"),
        };
        const response = await axios.post(
          "http://localhost:4000/todo/updatetask",
          {
            task: task,
            id: localStorage.getItem("user"),
            ele: eleId,
          },
          { headers }
        );
        //console.log(response);
        setUserData(response.data.data);
        setTask("");
        setBtn("ADD");
      } catch (error) {
        console.log(error);
      }
    } else {
      // ye vala add krne ke liye hai pure ko .......///
      try {
        const headers = {
          auth: localStorage.getItem("auth"),
        };
        const response = await axios.post(
          "http://localhost:4000/todo/addtask",
          {
            task: task,
            id: localStorage.getItem("user"),
          },
          { headers }
        );
        //console.log(response);
        setUserData((prev) => [...prev, response.data.data]);
        setTask("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // delete a particular task in react js ...///

  const DeleteTask = async (ID) => {
    try {
      console.log(ID);
      const headers = {
        auth: localStorage.getItem("auth"),
      };
      const response = await axios.post(
        "http://localhost:4000/todo/delete",
        {
          key: ID,
          id: localStorage.getItem("user"),
        },
        { headers }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // update ke liye phle ye call hoga .. then update hoga dubara se button ko touch krne par ..//
  const UpdateTask = (ID) => {
    const data = userData.filter((e, idx) => {
      return e._id === ID;
    });
    setTask(data[0].task);
    setBtn("UPDATE");
    seteleId(ID);
  };

  return (
    <>
      <div className="text mx-auto">
        <div className="container">
          <h1 className="text-center display-2">Task List</h1>
          <div className="d-flex justify-content column">
            <textarea
              class="form-control"
              aria-label="With textarea"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
            <button
              type="button"
              class="btn btn-dark"
              onClick={() => AddTask(btn)}
            >
              {btn}
            </button>
          </div>
          {userData &&
            userData.map((element, idx) => {
              return (
                <Data
                  key={element._id}
                  text={element.task}
                  DeleteTask={() => DeleteTask(element._id)}
                  UpdateTask={() => UpdateTask(element._id)}
                ></Data>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
