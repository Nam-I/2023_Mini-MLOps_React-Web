import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const postSignUp = () => {
    fetch("/api/users/join", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div id="signInDiv">
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">회원가입</h1>

          <div className="form-floating my-2">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">아이디</label>
          </div>
          <div className="form-floating my-2">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingPassword">이름</label>
          </div>
          <div className="form-floating my-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">비밀번호</label>
          </div>

          <div id="signInBtn">
            <button
              className="btn btn-dark w-100 py-2"
              type="button"
              onClick={postSignUp}
            >
              회원가입
            </button>
          </div>
          <p className="mt-5 mb-3 text-body-secondary"></p>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
