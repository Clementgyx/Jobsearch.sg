import React, { useState } from "react";
import { toast } from "react-toastify";
import Dashboard from "../components/Dashboard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
function CreateJob({ setAuth }) {
  const [submitForm, SetSubmitForm] = useState({
    company: "",
    job_position: "",
    job_description: "",
  });

  const { company, job_position, job_description } = submitForm;

  const onChange = (e) =>
    SetSubmitForm({ ...submitForm, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { company, job_position, job_description };
      await fetch("http://localhost:5000/joblist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success("New job posted successfully", {
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
      <h1>Create a job offer</h1>
      <h4>Describe what your job is below</h4>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3" controlId="formBasicCompany">
          <Form.Label>Company name</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={company}
            placeholder="Enter your company name"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicJobPosition">
          <Form.Label>Job position/title</Form.Label>
          <Form.Control
            type="text"
            name="job_position"
            value={job_position}
            placeholder="Enter your Job position/title"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicJobDescription">
          <Form.Label>Job description</Form.Label>
          <Form.Control
            type="text"
            name="job_description"
            value={job_description}
            placeholder="Enter your Job description and contact details"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default CreateJob;
