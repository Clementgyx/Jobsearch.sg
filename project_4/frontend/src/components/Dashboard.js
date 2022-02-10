import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const sidebarNavItems = [
  {
    display: "Home",
    icon: <i className="bx bx-home"></i>,
    to: "/home",
    section: "home",
  },
  {
    display: "Find jobs",
    icon: <i class="bx bx-list-ol"></i>,
    to: "/findjobs",
    section: "findjobs",
  },
  {
    display: "Post a new job",
    icon: <i class="bx bx-comment-edit"></i>,
    to: "/postjob",
    section: "postjob",
  },
  {
    display: "User",
    icon: <i className="bx bx-user"></i>,
    to: "/user",
    section: "user",
  },
];

function Dashboard() {
  const [name, setName] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  //only when it's rendered
  useEffect(() => {
    getName();
  }, []);
  //sidebar logic
  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div>
      <div className="sidebar">
        <h1>Welcome back {name}</h1>
        <div className="sidebar__logo">Jobsearch.SG</div>
        <div ref={sidebarRef} className="sidebar__menu">
          <div
            ref={indicatorRef}
            className="sidebar__menu__indicator"
            style={{
              transform: `translateX(-50%) translateY(${
                activeIndex * stepHeight
              }px)`,
            }}
          ></div>
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
