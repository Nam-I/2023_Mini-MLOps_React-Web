import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AuthProtectedDashBoard,
  AuthProtectedData,
  AuthProtectedModelTrain,
  AuthProtectedModelDeploy,
  AuthProtectedUserLog,
} from "./routes/Auth";
import UserService from "./routes/UserService";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthProtectedDashBoard />} exact />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/data" element={<AuthProtectedData />} />
        <Route path="/model-train" element={<AuthProtectedModelTrain />} />
        <Route path="/model-deploy" element={<AuthProtectedModelDeploy />} />
        <Route path="/user-log" element={<AuthProtectedUserLog />} />
        <Route path="/user-service" element={<UserService />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
