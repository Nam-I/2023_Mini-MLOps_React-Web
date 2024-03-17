import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import ServiceMovie from "../components/ServiceMovie";
import "./UserService.scss";

function UserService() {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState("");
  const [isWord2Vec, setIsWord2Vec] = useState(false);
  const [userLogId, setUserLogId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const urlWord2Vec = "/api/models/result/word2vec";
  const urlGPT = "/api/models/result/gpt";

  const MySwal = withReactContent(Swal);

  const Toast = MySwal.mixin({
    toast: true,
    position: "center-center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseclick", Swal.stopTimer);
    },
  });

  Toast.mixin({
    icon: "success",
    title: "만족도(긍정) 선택 완료",
  }).bindClickHandler("data-swal-toast-template-good");

  Toast.mixin({
    icon: "success",
    title: "만족도(부정) 선택 완료",
  }).bindClickHandler("data-swal-toast-template-bad");

  const saveResult = async (url) => {
    setIsLoading(true);
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: userInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data.result);
        setIsWord2Vec(url === urlWord2Vec);
        if (url === urlWord2Vec) {
          setUserLogId(data.data.id);
        }
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const selectGood = () => {
    fetch(`/api/user-logs/good?id=${userLogId}`, {
      method: "post",
    }).catch((e) => console.log(e));
  };

  const selectBad = () => {
    fetch(`/api/user-logs/bad?id=${userLogId}`, {
      method: "post",
    }).catch((e) => console.log(e));
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

  // const resizeTextarea = () => {
  //   const textarea = document.getElementById("userInputTextarea");
  //   textarea.style.height = "auto";
  //   textarea.style.height = textarea.scrollHeight + "px";
  // };

  return (
    <div className="p-4">
      {isLoading ? <Loading /> : null}
      <main id="testmain" className="px-5">
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          id="fontList"
        >
          <h2>영탐정 - 영화 제목이 뭐였더라?</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col d-flex flex-column justify-content-between">
            <div className="card mb-3">
              <div className="card-body mb">
                <div id="fontList">
                  <textarea
                    id="userInputTextarea"
                    value={userInput}
                    onChange={(e) => {
                      setUserInput(e.target.value);
                      // resizeTextarea();
                    }}
                    style={{
                      width: "100%",
                      height: "90px",
                      padding: "10px 0 0 10px",
                    }}
                  ></textarea>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  <div className="col d-flex flex-column justify-content-between">
                    <button
                      id="fontList"
                      class="learn-more my-2"
                      type="button"
                      style={{ width: "100%" }}
                      onClick={() => {
                        saveResult(urlWord2Vec);
                      }}
                    >
                      Word2Vec&nbsp;&nbsp;적용
                    </button>
                  </div>
                  <div className="col d-flex flex-column justify-content-between">
                    <span>
                      <button
                        id="fontList"
                        class="learn-more my-2"
                        type="button"
                        style={{ width: "100%" }}
                        onClick={() => {
                          saveResult(urlGPT);
                        }}
                      >
                        GPT&nbsp;&nbsp;적용
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {results && isWord2Vec ? (
              <div className="p-0">
                <div className="card">
                  <div className="card-body">
                    <div id="fontList">
                      <b>답변에 만족하시나요?</b>
                    </div>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 g-4 mb-0">
                      <div className="col d-flex flex-column justify-content-between">
                        <button
                          data-swal-toast-template-good="#my-template"
                          className="btn btn-link flex-grow-1"
                          type="button"
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            selectGood();
                          }}
                        >
                          <img
                            src="./assets2/img/good.png"
                            style={{ width: "55px" }}
                          />
                        </button>
                      </div>
                      <div className="col d-flex flex-column justify-content-between">
                        <button
                          data-swal-toast-template-bad="#my-template"
                          className="btn btn-link flex-grow-1"
                          type="button"
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            selectBad();
                          }}
                        >
                          <img
                            src="./assets2/img/bad.png"
                            style={{ width: "55px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div>
                  <table className="table table-striped table-sm table-hover text-center">
                    <thead id="fontList">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">제목</th>
                        <th scope="col">개봉일</th>
                        <th scope="col">유사도</th>
                      </tr>
                    </thead>
                    <tbody id="fontList">
                      {results ? (
                        results.map((result, index) => (
                          <ServiceMovie
                            key={result.movie.id}
                            number={index + 1}
                            title={result.movie.title}
                            poster={result.movie.poster}
                            summary={result.movie.summary}
                            releaseDate={result.movie.releaseDate}
                            similarity={result.similarity}
                          />
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
      </main>
    </div>
  );
}

export default UserService;
