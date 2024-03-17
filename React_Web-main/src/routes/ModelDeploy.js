import React, { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import Aside from "../components/Aside";
import Model from "../components/Model";
import Paging from "../components/Paging";

function ModelDeploy() {
  const [models, setModels] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);

  const getModelData = (page) => {
    fetch(`/api/models?page=${page}&size=8`, {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setModels(data.data.model);
        setPageInfo({
          totalPages: data.data.totalPages,
          totalElements: data.data.totalElements,
          first: data.data.first,
          last: data.data.last,
        });
      })
      .catch((e) => console.log(e));
  };

  const setDeployStatus = () => {
    fetch("/api/tasks/deploy/status", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let status = data.data.status;
        setStatus(status);
        setCount(count + 1);
      })
      .catch((e) => console.log(e));
  };

  const handlePageChange = (_, pageNumber) => {
    setCurrentPage(pageNumber - 1);
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
    getModelData(currentPage);
  }, [currentPage, models]);

  useEffect(() => {
    const id = setInterval(() => {
      setDeployStatus();
    }, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="g-sidenav-show bg-gray-100" id="fontList">
      <div className="min-height-250 bg-primary position-absolute w-100"></div>
      <Aside />
      <main className="main-content position-relative border-radius-lg ">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-body pb-0" id="fontList">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Model Deploy</h1>
                  </div>
                  <div className="row g-5">
                    {status ? (
                      <div id="loadingDiv">
                        <RiseLoader color="#0000C9" />
                        <div id="loadingText">
                          <h4>Deploying...</h4>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="row row-cols-1 row-cols-md-4 mb-3 text-center"
                        id="cardDiv"
                      >
                        {models.map((model) => {
                          return (
                            <Model
                              key={model.id}
                              id={model.id}
                              dataStartDate={model.dataStartDate}
                              dataEndDate={model.dataEndDate}
                              vectorSize={model.vectorSize}
                              windowSize={model.windowSize}
                              minCount={model.minCount}
                              sg={model.sg}
                              epochs={model.epochs}
                              creationDate={model.creationDate}
                              setStatus={setStatus}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <nav aria-label="Page navigation example" id="fontList">
                  <Paging
                    currentPage={currentPage}
                    size={8}
                    totalElements={pageInfo.totalElements}
                    handlePageChange={handlePageChange}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ModelDeploy;
