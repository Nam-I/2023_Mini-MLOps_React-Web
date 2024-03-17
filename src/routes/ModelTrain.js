import React, { useState, useEffect, forwardRef } from "react";
import { ko } from "date-fns/esm/locale";
import Aside from "../components/Aside";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ModelTrain() {
  var now = new Date();
  now.setDate(new Date().getDate() - 1095);
  // const [dataStartDate, setStart] = useState(now);
  // const [dataEndDate, setEnd] = useState(new Date());
  const [dataStartDate, setStart] = useState(new Date("2007-01-01"));
  const [dataEndDate, setEnd] = useState(new Date("2011-01-01"));
  const [vectorSize, setVectorSize] = useState("100");
  const [windowSize, setWindowSize] = useState("5");
  const [minCount, setMinCount] = useState("1");
  const [sg, setSg] = useState("1");
  const [epochs, setEpochs] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);

  function leftPad(value) {
    return value >= 10 ? value : `0${value}`;
  }

  function toStringByFormatting(source, delimiter = "-") {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
  }

  let start = toStringByFormatting(dataStartDate);
  let end = toStringByFormatting(dataEndDate);
  console.log(start);
  console.log(end);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      className="form-control"
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly
      style={{ width: "160px", textAlign: "center" }}
    />
  ));

  const countData = () => {
    fetch(`/api/movies/count?startDate=${start}&endDate=${end}`, {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataCount(data.data.totalElements);
      })
      .catch((e) => console.log(e));
  };

  const createModel = () => {
    fetch("/api/models/train", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: getLocalStorage("access-token"),
      },
      body: JSON.stringify({
        dataStartDate: dataStartDate,
        dataEndDate: dataEndDate,
        vectorSize: vectorSize,
        windowSize: windowSize,
        minCount: minCount,
        sg: sg,
        epochs: epochs,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("send", data);
      });
  };

  const setTrainStatus = () => {
    fetch("/api/tasks/train/status", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.data.status);
        setCount(count + 1);
        console.log(status);
        console.log(count);
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
    countData();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTrainStatus();
    }, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div class="g-sidenav-show bg-gray-100" id="fontList">
      <div class="min-height-250 bg-primary position-absolute w-100"></div>
      <Aside />
      <main class="main-content position-relative border-radius-lg ">
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header pb-0">
                  <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    id="fontList"
                  >
                    <h1 className="h2">Model Train</h1>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  <div className="col">
                    <div className="pt-0">
                      <div className="card-body">
                        <div className="col-sm-12 pl-0" id="modelTrainHyper">
                          <div>
                            <h6 id="fontList">데이터</h6>
                          </div>
                          <div id="dateDiv">
                            <div id="fontList">
                              <DatePicker
                                locale={ko}
                                dateFormat="yyyy-MM-dd" // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                selected={dataStartDate}
                                onChange={(date) => {
                                  setStart(date);
                                }}
                                showYearDropdown
                                showMonthDropdown
                                scrollableYearDropdown
                                customInput={<ExampleCustomInput />}
                              />
                            </div>
                            <div className="mt-2 mx-2" id="fontList">
                              ~
                            </div>
                            <div id="fontList">
                              <DatePicker
                                locale={ko}
                                dateFormat="yyyy-MM-dd" // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                selected={dataEndDate}
                                onChange={(date) => {
                                  setEnd(date);
                                }}
                                showYearDropdown
                                showMonthDropdown
                                scrollableYearDropdown
                                customInput={<ExampleCustomInput />}
                              />
                            </div>
                            <div id="data_btn_div">
                              <button
                                className="btn btn-link btn-sm p-1"
                                type="button"
                                onClick={() => {
                                  countData();
                                }}
                              >
                                <img
                                  src="./assets2/img/search.png"
                                  style={{ width: "20px" }}
                                />
                              </button>
                            </div>
                            <div
                              className="px-3"
                              id="dataCountDiv"
                              style={{
                                width: "20%",
                                height: "20%",
                                borderRadius: "10px",
                                marginLeft: "auto",
                              }}
                            >
                              <label id="dataCountLabel">
                                개수 :&nbsp;&nbsp;
                              </label>
                              <div id="dataCountValue">{dataCount}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 pl-0" id="modelTrainHyper">
                          <h6>vector_size</h6>
                          <input
                            type="text"
                            className="form-control"
                            value={vectorSize}
                            onChange={(e) => setVectorSize(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 pl-0" id="modelTrainHyper">
                          <h6>window</h6>
                          <input
                            type="text"
                            className="form-control"
                            value={windowSize}
                            onChange={(e) => setWindowSize(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 pl-0" id="modelTrainHyper">
                          <h6>min_count</h6>
                          <input
                            type="text"
                            className="form-control"
                            value={minCount}
                            onChange={(e) => setMinCount(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 pl-0" id="modelTrainHyper">
                          <h6>sg</h6>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={sg}
                            onChange={(e) => setSg(e.target.value)}
                          >
                            <option value="0">CBOW</option>
                            <option value="1">Skip-gram</option>
                          </select>
                        </div>
                        <div className="col-sm-12 pl-0" id="modelTrainHyper">
                          <h6>epochs</h6>
                          <input
                            type="text"
                            className="form-control"
                            value={epochs}
                            onChange={(e) => setEpochs(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 pl-0" id="modelTrainBtn">
                          {status ? (
                            <div className="d-flex gap-2 justify-content-center py-3">
                              <button
                                className="w-100 btn btn-primary"
                                type="button"
                                id="fontList"
                                style={{ fontSize: "17px" }}
                                disabled
                              >
                                <span
                                  className="spinner-border spinner-border-sm"
                                  aria-hidden="true"
                                ></span>
                                &nbsp;&nbsp;&nbsp;
                                <span role="status">Training...</span>
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex gap-2 justify-content-center py-3">
                              <button
                                className="w-100 btn btn-primary"
                                type="button"
                                id="fontList"
                                style={{ fontSize: "17px" }}
                                onClick={() => {
                                  createModel();
                                }}
                              >
                                Start!
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="modelTarainCard2">
                    <div className="col">
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text" id="fontList">
                            <div id="trainExplainDiv">
                              <div id="trainExplainData">
                                <div>
                                  <b>data</b>
                                </div>
                                <div id="dataContents">
                                  <ul id="trainExplainUl">
                                    <li>
                                      개봉일을 기준으로 데이터를 선택합니다.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div id="trainExplainData">
                                <div>
                                  <b>vector_size</b>
                                </div>
                                <div id="vectorSizeContents">
                                  <ul id="trainExplainUl">
                                    <li>
                                      벡터의 차원을 지정합니다. 보통 높은
                                      차원일수록 모델은 더 많은 특징을 학습할 수
                                      있지만 계산 비용이 증가합니다. 작업이 더
                                      복잡하거나 큰 어휘 크기를 다룰 때는 큰
                                      차원이 유용할 수 있습니다.
                                    </li>
                                    <li id="trainRecommend">
                                      추천값 : 100 ~ 300
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div id="trainExplainData">
                                <div>
                                  <b>window</b>
                                </div>
                                <div id="windowContents">
                                  <ul id="trainExplainUl">
                                    <li>
                                      주어진 단어를 예측하기 위해 고려되는 주변
                                      단어의 최대 거리입니다. 즉, 한 단어의 문맥
                                      창 크기를 나타냅니다. 작은 윈도우 크기는
                                      더 국소적인 의미를 갖는 벡터를 생성하고,
                                      큰 윈도우 크기는 더 전역적인 의미를 갖는
                                      벡터를 생성할 수 있습니다.
                                    </li>
                                    <li id="trainRecommend">추천값 : 5 ~ 10</li>
                                  </ul>
                                </div>
                              </div>
                              <div id="trainExplainData">
                                <div>
                                  <b>min_count</b>
                                </div>
                                <div id="minCountContents">
                                  <ul id="trainExplainUl">
                                    <li>
                                      학습에 사용할 단어의 최소 빈도수를
                                      지정합니다. 이 빈도수보다 낮은 빈도를 가진
                                      단어는 무시되어 학습할 때 제외됩니다. 이
                                      값은 데이터에 따라 다르며, 빈도가 낮은
                                      단어를 무시하면 모델이 더 나은 특징을
                                      학습할 수 있습니다.
                                    </li>
                                    <li id="trainRecommend">추천값 : 5 ~ 20</li>
                                  </ul>
                                </div>
                              </div>
                              <div id="trainExplainData">
                                <div>
                                  <b>sg</b>
                                </div>
                                <div id="sgContents">
                                  <ul id="trainExplainUl">
                                    <li>
                                      CBOW는 주변 단어를 통해 주어진 단어를
                                      예측하는 방식입니다.
                                    </li>
                                    <li>
                                      Skip-gram은 주어진 단어로 주변 단어를
                                      예측하는 방식입니다.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div id="trainExplainData">
                                <div>
                                  <b>epochs</b>
                                </div>
                                <div id="epochContents">
                                  <ul id="trainExplainUl">
                                    <li>
                                      전체 데이터셋을 몇 번 반복하여 학습할지를
                                      나타냅니다. 높은 epoch 수는 모델이 더 많은
                                      학습을 수행하게 하지만, 과적합의 가능성이
                                      있습니다. 데이터셋의 크기와 모델의 학습
                                      속도에 따라 다르며 모델이 수렴할 때까지
                                      조절할 수 있습니다.
                                    </li>
                                    <li id="trainRecommend">
                                      추천값 : 10 ~ 20
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style={{ margin: "0%" }} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ModelTrain;
