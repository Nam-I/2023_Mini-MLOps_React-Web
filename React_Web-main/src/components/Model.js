import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

function Model({
  id,
  dataStartDate,
  dataEndDate,
  vectorSize,
  windowSize,
  minCount,
  sg,
  epochs,
  creationDate,
}) {
  const postData = (model_id) => {
    fetch(`/api/models/deploy?id=${model_id}`, {
      method: "post",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("model_send", data);
      });
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

  let creationDateChage = timeFormat(creationDate);

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
    <div className="col">
      <div className="card mb-4 rounded-3 shadow-sm">
        <div className="card-header py-3">
          <h4 className="my-0 fw-normal">Word2Vec_{id}</h4>
        </div>
        <div>
          <div id="modelTable">
            <table width="100%">
              <tbody>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">dataStartDate</div>
                  </th>
                  <td>
                    <div id="modelValue">{dataStartDate}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">dataEndDate</div>
                  </th>
                  <td>
                    <div id="modelValue">{dataEndDate}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">vector_size</div>
                  </th>
                  <td>
                    <div id="modelValue">{vectorSize}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">window</div>
                  </th>
                  <td>
                    <div id="modelValue">{windowSize}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">min_count</div>
                  </th>
                  <td>
                    <div id="modelValue">{minCount}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">sg</div>
                  </th>
                  <td>
                    <div id="modelValue">{sg}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">epochs</div>
                  </th>
                  <td>
                    <div id="modelValue">{epochs}</div>
                  </td>
                </tr>
                <tr id="modelBorderBottom">
                  <th id="modelBorderRight">
                    <div id="modelKey">creationDate</div>
                  </th>
                  <td>
                    <div id="modelValue">{creationDateChage}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="modelBtnDiv">
            <button
              type="button"
              className="w-100 btn btn-lg btn-outline-primary"
              id="fontList"
              onClick={() => postData(id)}
            >
              Deploy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Model.propTypes = {
  id: PropTypes.number.isRequired,
  dataStartDate: PropTypes.string.isRequired,
  dataEndDate: PropTypes.string.isRequired,
  vectorSize: PropTypes.number.isRequired,
  windowSize: PropTypes.number.isRequired,
  minCount: PropTypes.number.isRequired,
  sg: PropTypes.number.isRequired,
  epochs: PropTypes.number.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default Model;
