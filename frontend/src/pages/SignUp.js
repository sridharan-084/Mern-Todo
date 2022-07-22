import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const CreateUser = async () => {
    if (!username || !email || !password) {
      alert("Please fill all the fields properly");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/todo/signup", {
        username,
        email,
        password,
      });
      if (response.data.message === "User already exist") {
        alert("You already have an account please try to login instead");
        return;
      } else {
        alert("Account created successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="mx-auto width-signup p-5 mt-5">
          <h1>SignUp</h1>
          <h3>UserName</h3>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="UserName"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <h3>Email Address</h3>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Email address"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <h3>Password</h3>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            type="button"
            className="btn btn-light mt-3 btn-lg"
            onClick={() => CreateUser()}
          >
            SignUp
          </button>
          <h5 className="mt-3">
            Already have an account wants to{" "}
            <Link className="text-dark" to="/login">
              {" "}
              Login{" "}
            </Link>
            ?
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
