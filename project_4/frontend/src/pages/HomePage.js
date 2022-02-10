import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Carousel from "react-bootstrap/Carousel";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
function HomePage({ setAuth }) {
  const [numberOfJobs, setNumberOfJobs] = useState([]);
  const fetchAllJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/joblist");
      const data = await res.json();
      setNumberOfJobs(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllJobs();
  });
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
      <Dashboard setAuth={setAuth}></Dashboard>
      <h1>There are currently {numberOfJobs.length} jobs available</h1>
      <Carousel>
        <Carousel.Item>
          <Link to="/findjobs">
            <img
              className="d-block w-100"
              src="https://cdn.searchenginejournal.com/wp-content/uploads/2017/06/shutterstock_268688447.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First time here?</h3>
              <p>Click here to start finding your dream job today!</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/postjob">
            <img
              className="d-block w-100"
              src="https://d3o1wlpkmt4nt9.cloudfront.net/wp-content/uploads/2018/02/01150023/startup-hiring-1-min.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Looking for the perfect employee?</h3>
              <p>Click here to to get started with a job posting!</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://afckstechnologies.in/img/public_blue_users.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Learn more about yourself</h3>
            <p>Click here to find out more about yourself.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomePage;
