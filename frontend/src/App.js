import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Nav from "./pages/Nav";
import Protected from "./Protected/Protected";
import ProtectedHome from "./Protected/ProtectedHome";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loggedin, setloggedin] = useState(false);

  return (
    <div className="App">
      <Nav status={loggedin} setStatus={setloggedin}></Nav>
      <BrowserRouter>
        {/* <div className="pages"> */}
        <Routes>
          <Route element={<ProtectedHome></ProtectedHome>}>
            <Route
              path="/"
              element={<Home status={setloggedin}></Home>}
            ></Route>
          </Route>
          <Route element={<Protected></Protected>}>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
          </Route>
          <Route path="*" element={<NoPage></NoPage>}></Route>
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </div>
  );
};

export default App;

/**
 *
 * local storage .. banda aagya chla gaya
 *
 * app  usetate ... C  true , false ... nav <>home ,.....<>
 *
 *
 * home .. C(true);   login ke baad // update ..
 *
 *
 */
