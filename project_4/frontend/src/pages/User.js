import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
function User({ setAuth }) {
  const [name, setName] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  //logout and remove JWT
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div
      style={{
        padding: "50px 0px 0px 370px",
      }}
    >
      <Button variant="danger" onClick={(e) => logout(e)}>
        Logout
      </Button>
      <Dashboard></Dashboard>
      <h1>User profile infomation</h1>
      <ul>
        <li>
          <h3>Name:{name}</h3>
        </li>
      </ul>
    </div>
  );
}

export default User;
