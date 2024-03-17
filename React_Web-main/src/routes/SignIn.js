import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("namiso");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();

  const postSignIn = () => {
    fetch("/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLocalStorageTimer(
            "access-token",
            "Bearer " + data.data.accessToken,
            43200000
          );

          navigate("/");
        } else {
          alert("ID 혹은 패스워드를 확인해주세요.");
        }
      })
      .catch((e) => console.log(e));
  };

  const setLocalStorageTimer = (key, value, time) => {
    let now = new Date();
    let item = {
      value: value,
      expireTime: now.getTime() + time,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  return (
    <div class="bg-gradient-primary max-height-400" id="signInDiv">
      <div id="singnInTitleDiv">Mini MLOps</div>
      <main className="form-signin w-100 m-auto" id="signInTestMain">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg">
                <div class="card-body p-0">
                  <div class="row">
                    <div
                      class="col-lg-6 d-none d-lg-block"
                      id="singnInTestImg"
                    ></div>
                    <div class="col-lg-6" id="signInTestDiv2">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4" id="fontList">
                            Welcome Back!
                          </h1>
                        </div>
                        <form class="user" id="fontList">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control form-control-user"
                              id="floatingInput"
                              placeholder="User Name"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <a
                            class="btn btn-primary btn-user btn-block"
                            onClick={() => {
                              postSignIn();
                            }}
                          >
                            Login
                          </a>
                          <hr />
                        </form>
                        <div class="text-center" id="fontList">
                          <a class="small" href="#">
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
