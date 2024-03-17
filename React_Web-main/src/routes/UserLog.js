import React, { useState, useEffect } from "react";
import Aside from "../components/Aside";
import Paging from "../components/Paging";
import UserLogCompo from "../components/UserLogCompo";

function UserLog() {
  const [userLogs, setUserLogs] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
  });
  const [currentPage, setCurrentPage] = useState(0);

  const getUserLogData = (page) => {
    fetch(`/api/user-logs?page=${page}&size=5`, {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserLogs(data.data.userLog);
        setPageInfo({
          totalPages: data.data.totalPages,
          totalElements: data.data.totalElements,
          first: data.data.first,
          last: data.data.last,
        });
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
    getUserLogData(currentPage);
  }, [currentPage]);

  return (
    <div class="g-sidenav-show bg-gray-100" id="fontList">
      <div class="min-height-250 bg-primary position-absolute w-100"></div>
      <Aside />
      <main class="main-content position-relative border-radius-lg ">
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12">
              <div class="card mb-4">
                <div class="card-body pb-4" id="fontList">
                  <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    id="fontList"
                  >
                    <h1 className="h2">User Log</h1>
                  </div>
                  <table id="dataTable" width="100%">
                    <thead id="fontList">
                      <tr id="dataTitleTr">
                        <th
                          width="8%"
                          align="center"
                          id="userLogNumber"
                          style={{ fontSize: "17px", paddingBottom: "0.5%" }}
                        >
                          #
                        </th>
                        <th
                          width="14%"
                          align="center"
                          style={{ fontSize: "17px", paddingBottom: "0.5%" }}
                        >
                          입력
                        </th>
                        <th
                          width="20%"
                          style={{
                            fontSize: "17px",
                            paddingLeft: "1%",
                            paddingBottom: "0.5%",
                          }}
                        >
                          결과
                        </th>
                        <th
                          width="10%"
                          align="center"
                          style={{
                            paddingBottom: "0.5%",
                            paddingLeft: "1.5%",
                            fontSize: "17px",
                          }}
                        >
                          모델 버전
                        </th>
                        <th
                          width="10%"
                          align="center"
                          style={{
                            paddingBottom: "0.5%",
                            paddingLeft: "1.5%",
                            fontSize: "17px",
                          }}
                        >
                          요청 시간
                        </th>
                        <th
                          width="5%"
                          align="center"
                          style={{
                            paddingBottom: "0.5%",
                            fontSize: "17px",
                            textAlign: "center",
                          }}
                        >
                          만족도
                        </th>
                      </tr>
                    </thead>
                    <tbody id="fontSmall">
                      {userLogs.map((userLog) => {
                        return (
                          <UserLogCompo
                            key={userLog.id}
                            id={userLog.id}
                            input={userLog.input}
                            modelId={userLog.modelId}
                            output={userLog.output}
                            requestDate={userLog.requestDate}
                            satisfaction={userLog.satisfaction}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <nav aria-label="Page navigation example" id="fontList">
                  <Paging
                    currentPage={currentPage}
                    size={5}
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

export default UserLog;
