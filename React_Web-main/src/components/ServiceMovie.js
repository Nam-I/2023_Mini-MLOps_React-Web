import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";

function ServiceMovie({
  number,
  title,
  poster,
  summary,
  releaseDate,
  similarity,
}) {
  const MySwal = withReactContent(Swal);

  const openModal = () => {
    MySwal.fire({
      title: title,
      text: summary,
      imageUrl: poster,
      imageHeight: 400,
      showConfirmButton: false,
    });
  };

  return (
    <tr onClick={openModal} style={{ fontSize: "15px", cursor: "pointer" }}>
      <td>{number}</td>
      <td>{title}</td>
      <td>{releaseDate}</td>
      <td>{(similarity * 100).toFixed(2)}%</td>
    </tr>
  );
}

export default ServiceMovie;
