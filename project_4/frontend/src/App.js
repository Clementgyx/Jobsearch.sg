import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//css related imports go here
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import "boxicons/css/boxicons.min.css";
//components go here
import Landing from "./pages/Landing";
import Errorpage from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob";
import FindJobs from "./pages/FindJobs";
import HomePage from "./pages/HomePage";
import User from "./pages/User";
toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //logic to check for token, using true or false
  const setAuth = (Boolean) => {
    setIsAuthenticated(Boolean);
  };

  //check jwt is valid when you refresh
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  //run once on mount
  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    //IF USE SWITCH, ALL THE SPECIFIC PATHS SHOULD GO FIRST, OTHERWISE WILL SKIP. USE EXACT IF NEEDED
    // if you use render prop, the component is evaluated on every Route#render.
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            !isAuthenticated ? (
              <Register {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route
          exact
          path="/home"
          render={(props) =>
            isAuthenticated ? (
              <HomePage {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/findjobs"
          render={(props) =>
            isAuthenticated ? (
              <FindJobs {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/postjob"
          render={(props) =>
            isAuthenticated ? (
              <CreateJob {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/user"
          render={(props) =>
            isAuthenticated ? (
              <User {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="*" component={Errorpage} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
