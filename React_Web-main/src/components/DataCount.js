import React from "react";
import { useState, useEffect } from "react";

function DataCount() {
  const [dataToday, setDataToday] = useState(0);

  useEffect(() => {
    getDataCount();
  }, []);

  const getDataCount = () => {
    fetch(`/api/movies/count/today`, {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataToday(data.data.totalElements);
        console.log("dataToday:", dataToday);
      })
      .catch((e) => console.log(e));
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

  return (
    <div id="homeDataCountDiv">
      <h2 id="homeUserNum">Today's data count</h2>
      <div
        style={{
          fontSize: "90px",
          textAlign: "center",
          fontFamily: "SUITE-Regular",
        }}
      >
        {dataToday}
      </div>
    </div>
  );
}

export default DataCount;
