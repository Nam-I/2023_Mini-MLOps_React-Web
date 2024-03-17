import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Aside() {
  const [trainStatus, setTrainStatus] = useState(false);
  const [trainCount, setTrainCount] = useState(0);
  const [deployStatus, setDeployStatus] = useState(false);
  const [deployCount, setDeployCount] = useState(0);

  const fetchTrainStatus = () => {
    fetch("/api/tasks/train/status", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrainStatus(data.data.status);
        setTrainCount(trainCount + 1);
      })
      .catch((e) => console.log(e));
  };

  const fetchDeployStatus = () => {
    fetch("/api/tasks/deploy/status", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDeployStatus(data.data.status);
        setDeployCount(deployCount + 1);
      })
      .catch((e) => console.log(e));
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    window.location.reload();
  };

  const getLocalStorage = (key) => {
    let item = localStorage.getItem(key);
    if (item === null) return null;

    item = JSON.parse(item);

    const now = new Date();
    if (now.getTime() > item.expireTime) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  };

  useEffect(() => {
    const id = setInterval(() => {
      fetchTrainStatus();
    }, 1000);
    return () => clearInterval(id);
  }, [trainCount]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchDeployStatus();
    }, 1000);
    return () => clearInterval(id);
  }, [deployCount]);

  return (
    <aside
      className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-4 fixed-start ms-4 "
      id="fontList"
    >
      <div id="asideTitle">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <div>
          <h5>Mini MLOps</h5>
        </div>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                window.location.pathname === "/" ? "active" : ""
              }`}
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/data"
              className={`nav-link ${
                window.location.pathname === "/data" ? "active" : ""
              }`}
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Data</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/model-train"
              className={`nav-link ${
                window.location.pathname === "/model-train" ? "active" : ""
              }`}
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-credit-card text-success text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Model Train</span>
              {trainStatus ? (
                <div style={{ marginLeft: "auto" }}>
                  <img
                    src="./assets2/img/spinner.gif"
                    style={{ width: "30px" }}
                  />
                </div>
              ) : null}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/model-deploy"
              className={`nav-link ${
                window.location.pathname === "/model-deploy" ? "active" : ""
              }`}
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-app text-info text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Model Deploy</span>
              {deployStatus ? (
                <div style={{ marginLeft: "auto" }}>
                  <img
                    src="./assets2/img/spinner.gif"
                    style={{ width: "30px" }}
                  />
                </div>
              ) : null}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/user-log"
              className={`nav-link ${
                window.location.pathname === "/user-log" ? "active" : ""
              }`}
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-world-2 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">User Log</span>
            </Link>
          </li>
          <li id="asideUnderHr">
            <hr className="horizontal dark" />
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "" ? "active" : ""
              }`}
              onClick={() => {
                logout();
              }}
              id="asideLogOut"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="fa fa-power-off text-dark text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Sign Out</span>
            </a>
          </li>
        </ul>
        {/* <div style={{ position: "absolute", left: "0px", bottom: "0px" }}>
              
          <button
            className="btn btn-primary"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "20px",
              alignContent: "center",
            }}
          >
            ▶
          </button>
        </div> */}
      </div>
    </aside>
  );
}
export default Aside;
