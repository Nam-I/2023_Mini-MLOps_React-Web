import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function Movie({ movieId, code, title, plot, releaseDate, collectionDate }) {
  const deleteData = async (movie_id) => {
    console.log(movie_id);
    await fetch(`/api/movies?id=${movie_id}`, {
      method: "delete",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data_delete", data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const deleteAlert = (movieId) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        deleteData(movieId);
        Swal.fire({
          title: "삭제되었습니다.",
          text: "",
          icon: "success",

          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
          confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        });
      } else if (result.isDismissed) {
      }
    });
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
    <tr id="dataContentsTr">
      <td className="movie_code" id="dataContentCode">
        {code}
      </td>
      <td className="movie_title">{title}</td>
      <td className="movie_plot" id="plotTd">
        {plot}
      </td>
      <td className="movie_releaseDate">{releaseDate}</td>
      <td id="collectionTd">{collectionDate}</td>
      <td align="center" id="deleteButton">
        <button
          type="button"
          className="btn btn-link btn-lg p-3 mt-3"
          onClick={() => deleteAlert(movieId)}
        >
          <img
            src="./assets2/img/trashCan.png"
            id="trashImg"
            style={{ width: "20px" }}
          />
        </button>
      </td>
    </tr>
  );
}

Movie.propTypes = {
  movieId: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plot: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  collectionDate: PropTypes.string.isRequired,
};

export default Movie;
