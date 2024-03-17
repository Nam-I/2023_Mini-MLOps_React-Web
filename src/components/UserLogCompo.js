import React from "react";
import PropTypes from "prop-types";

function UserLogCompo({
  id,
  input,
  modelId,
  output,
  requestDate,
  satisfaction,
}) {
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

  return (
    <tr id="dataContentsTr">
      <td id="userInputIdTd">{id}</td>
      <td id="userInputTd">{input}</td>
      <td style={{ paddingTop: "1.3%" }}>
        <ol start="1">
          {output.map((out, index) => {
            console.log(out);
            return <li>&nbsp;{out.movie.title}</li>;
          })}
        </ol>
      </td>
      <td id="userLogCompoModelId">Word2Vec_{modelId}</td>
      <td id="userLogCompoModelId">{timeFormat(requestDate)}</td>
      <td id="userCompoImg" style={{ alignContent: "center" }}>
        {satisfaction === true ? (
          <h3>
            <img src="./assets2/img/good.png" style={{ width: "30%" }} />
          </h3>
        ) : satisfaction === false ? (
          <h3>
            <img src="./assets2/img/bad.png" style={{ width: "30%" }} />
          </h3>
        ) : (
          <h3>
            <img src="./assets2/img/none.png" style={{ width: "30%" }} />
          </h3>
        )}
      </td>
    </tr>
  );
}

UserLogCompo.propTypes = {
  id: PropTypes.number.isRequired,
  input: PropTypes.number.isRequired,
};

export default UserLogCompo;
