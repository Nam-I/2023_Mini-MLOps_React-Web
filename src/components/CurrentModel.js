import React from "react";
import { useState, useEffect } from "react";

function CurrentModel() {
  const [currentModel, setCurrentModel] = useState("");
  const [lastDeployTime, setLastDeployTime] = useState("");

  useEffect(() => {
    getCurrentModel();
    getLastDeployTime();
  }, []);

  const getCurrentModel = () => {
    fetch("/api/tasks/current-model", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let currentModel = data.data.model;
        setCurrentModel(currentModel);
        console.log("currentModel", currentModel);
      })
      .catch((e) => console.log(e));
  };

  const getLastDeployTime = () => {
    fetch("/api/tasks/deploy/last-time", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLastDeployTime(data.data.lastDeployTime);
        console.log("lastDeployTime", lastDeployTime);
      })
      .catch((e) => console.log(e));
  };

  const timeFormat = (creationDate) => {
    let timeStamp = new Date(creationDate);
    console.log(timeStamp);
    var year = timeStamp.getFullYear();
    var month = ("0" + (timeStamp.getMonth() + 1)).slice(-2);
    var day = ("0" + timeStamp.getDate()).slice(-2);
    var hours = ("0" + timeStamp.getHours()).slice(-2);
    var minutes = ("0" + timeStamp.getMinutes()).slice(-2);
    var seconds = ("0" + timeStamp.getSeconds()).slice(-2);

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  let creationDateChange = timeFormat(currentModel.creationDate);
  let lastDeployTimeChange = timeFormat(lastDeployTime);

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

  return (
    <div id="currentModelDiv">
      <div id="currentModelTitle">
        <h2>Model Information</h2>
      </div>
      <table width="100%">
        <tbody>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">모델 버전</div>
            </th>
            <td>
              <div id="currentModelContents">Word2Vec_{currentModel.id}</div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">데이터 기간</div>
            </th>
            <td>
              <div id="currentModelContents">
                {currentModel.dataStartDate} ~ {currentModel.dataEndDate}
              </div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">vector_size</div>
            </th>
            <td>
              <div id="currentModelContents">{currentModel.vectorSize}</div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">window</div>
            </th>
            <td>
              <div id="currentModelContents">{currentModel.windowSize}</div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">min_count</div>
            </th>
            <td>
              <div id="currentModelContents">{currentModel.minCount}</div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">sg</div>
            </th>
            <td>
              <div id="currentModelContents">
                {currentModel.sg == 0 ? "CBOW" : "Skip-gram"}
              </div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">epochs</div>
            </th>
            <td>
              <div id="currentModelContents">{currentModel.epochs}</div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">모델 생성일</div>
            </th>
            <td>
              <div id="currentModelContents">{creationDateChange}</div>
            </td>
          </tr>
          <tr id="currentModelBorder">
            <th id="borderRight">
              <div id="currentModelKey">마지막 배포 시간</div>
            </th>
            <td>
              <div id="currentModelContents">{lastDeployTimeChange}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CurrentModel;
