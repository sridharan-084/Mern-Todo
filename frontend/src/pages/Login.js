import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const { setToken, setUser } = useContext(WorkoutContext);

  const LoginUser = async () => {
    if (!email || !password) {
      alert("Fill all the fields");
      return;
    } else {
      try {
        const respone = await axios.post("http://localhost:4000/todo/login", {
          email: email,
          password: password,
        });
        console.log(respone);
        if (respone.data.message === "No such user exit") {
          alert("Please create an account first");
        } else if (respone.data.message === "Invalid Credentials") {
          alert("Please provide valid ceredentials");
        } else {
          // jo token muje yaha se milega usko Local storage mei set krna padega krna padega ......//
          const token = respone.data.token;
          const userId = respone.data.userid;
          const username = respone.data.username;
          console.log(token, userId);
          // const SET = (userId) => {
          //   setUser(userId);
          // };
          // SET(userId);
          localStorage.setItem("auth", token);
          localStorage.setItem("user", userId);
          localStorage.setItem("username", username);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container ">
      <div className="mx-auto width p-5 mt-5">
        <h1>Login</h1>
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
          className="btn btn-danger mt-3 btn-lg"
          onClick={LoginUser}
        >
          Login
        </button>
        <h5 className="mt-3">
          Dont have an account wants to{" "}
          <Link className="text-dark" to="/signup">
            SignUp
          </Link>
          ?
        </h5>
      </div>
    </div>
  );
};

export default Login;
