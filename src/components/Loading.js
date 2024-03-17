import React from "react";
import { Background, LoadingText } from "./Styles";

export default () => {
  return (
    <Background>
      <LoadingText id="fontList" style={{ fontSize: "22px" }}>
        <b>잠시만 기다려 주세요</b>
      </LoadingText>
      <img src="./assets2/img/spinner.gif" alt="로딩중" width="10%" />
    </Background>
  );
};
