import React, { useState, useEffect, forwardRef } from "react";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import Aside from "../components/Aside";
import Movie from "../components/Movie";
import Paging from "../components/Paging";
import "react-datepicker/dist/react-datepicker.css";

function Data() {
  var now = new Date();
  now.setDate(new Date().getDate() - 7);
  const [dataStartDate, setStart] = useState(now);
  const [dataEndDate, setEnd] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
  });
  const [currentPage, setCurrentPage] = useState(0);

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

  const getMovieData = async (page) => {
    try {
      const response = await fetch(
        `/api/movies?startDate=${start}&endDate=${end}&page=${page}`,
        {
          method: "get",
          headers: {
            Authorization: getLocalStorage("access-token"),
          },
        }
      );
      const data = await response.json();
      setMovies(data.data.movie);
      setPageInfo({
        totalPages: data.data.totalPages,
        totalElements: data.data.totalElements,
        first: data.data.first,
        last: data.data.last,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (_, pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

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
    getMovieData(currentPage);
  }, [currentPage, movies]);

  return (
    <div className="g-sidenav-show bg-gray-100">
      <div className="min-height-250 bg-primary position-absolute w-100"></div>
      <Aside />
      <main
        className="main-content position-relative border-radius-lg "
        id="fontList"
      >
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    id="fontList"
                  >
                    <h1 className="h2">Data</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <div>
                        <DatePicker
                          locale={ko}
                          dateFormat="yyyy-MM-dd" // 날짜 형태
                          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                          minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                          selected={dataStartDate}
                          onChange={(date) => setStart(date)}
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                      <div className="mt-2 mx-2">~</div>
                      <div>
                        <DatePicker
                          locale={ko}
                          dateFormat="yyyy-MM-dd" // 날짜 형태
                          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                          minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                          selected={dataEndDate}
                          onChange={(date) => setEnd(date)}
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                      <div className="col-sm-1" id="data_btn_div">
                        <button
                          className="btn btn-link btn-sm p-1"
                          type="submit"
                          onClick={() => {
                            setCurrentPage(0);
                            getMovieData();
                          }}
                        >
                          <img
                            src="./assets2/img/search.png"
                            style={{ width: "20px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-4 pt-0 pb-4">
                  <div className="table-responsive small" id="dataTable">
                    <table width="100%">
                      <thead id="fontList" style={{ fontSize: "17px" }}>
                        <tr id="dataTitleTr">
                          <th
                            id="dataTitleCode"
                            width="10%"
                            style={{ paddingBottom: "0.5%" }}
                          >
                            영화 코드
                          </th>
                          <th width="10%" style={{ paddingBottom: "0.5%" }}>
                            제목
                          </th>
                          <th
                            id="plotTh"
                            width="60%"
                            style={{ paddingBottom: "0.5%" }}
                          >
                            줄거리
                          </th>
                          <th width="10%" style={{ paddingBottom: "0.5%" }}>
                            개봉일
                          </th>
                          <th width="10%" style={{ paddingBottom: "0.5%" }}>
                            수집일
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="fontList">
                        {movies?.map((movie) => {
                          return (
                            <Movie
                              key={movie.id}
                              movieId={movie.id}
                              code={movie.code}
                              title={movie.title}
                              plot={movie.plot}
                              releaseDate={movie.releaseDate}
                              collectionDate={movie.collectionDate}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <nav aria-label="Page navigation example" id="fontList">
                  <Paging
                    currentPage={currentPage}
                    size={10}
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

export default Data;
