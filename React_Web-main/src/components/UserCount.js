import React from "react";
import { useState, useEffect } from "react";

function UserCount() {
  const [userToday, setUserToday] = useState(0);
  const [userTotal, setUserTotal] = useState(0);

  const getUserCount = () => {
    fetch("/api/user-logs/count", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let userToday = data.data.todayElements;
        let userTotal = data.data.totalElements;
        setUserToday(String(userToday).padStart(3, "0"));
        setUserTotal(String(userTotal).padStart(3, "0"));
        console.log("userToday:", userToday);
        console.log("userToday:", userTotal);
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

  useEffect(() => {
    getUserCount();
  }, []);

  return (
    <div id="fontList">
      <h2 id="homeUserNum">Number of Users</h2>
      <div id="homeUserTodayNum">
        {userToday} / {userTotal}
      </div>
      <div style={{ fontSize: "18px", textAlign: "center" }}>
        Today&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;Total
      </div>
    </div>
  );
}

export default UserCount;
