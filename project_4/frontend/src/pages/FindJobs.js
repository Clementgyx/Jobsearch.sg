import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
import Dashboard from "../components/Dashboard";
import Jobcard from "../components/Jobcard";
import "./FindJobs.scss";
function FindJobs({ setAuth }) {
  const [allJobs, setAllJobs] = useState([]);
  //fetches all jobs
  const fetchAllJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/joblist");
      const data = await res.json();
      setAllJobs(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllJobs();
  });
  //   console.log(allJobs);
  //deletes a job

  const deleteAJob = async (id) => {
    try {
      await fetch(`http://localhost:5000/joblist/${id}`, {
        method: "DELETE",
      });
      setAllJobs(allJobs.filter((allJobs) => allJobs.allJobs_id !== id));
      toast.error("Selected job has been deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
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
      <h1>All new job listings</h1>
      <h4>Find new jobs and more</h4>
      <div className="jobcard">
        {allJobs.map((listofjobs) => {
          return (
            <div key={listofjobs.job_id}>
              <Jobcard listofjobs={listofjobs} deleteAJob={deleteAJob} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FindJobs;
