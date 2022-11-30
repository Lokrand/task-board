import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from "../../pages/Main/Main";
import "./App.module.css";
import { Tasks } from "../../pages/Tasks/Tasks";
import { Modal } from "../Modal/Modal";
import { useSelector } from "react-redux";
import { TaskDetails } from "../TaskDetails/TaskDetails";

export const App = () => {
  // const modalType = useSelector((state) => state.modal.modalType);
  const [modal, setModal] = useState(false)
  const navigate = useNavigate();
  console.log(navigate)
  const onCloseDetailsModal = () => {
    navigate.goBack();
    // dispatch(deleteDetails());
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tasks/:id" element={<Tasks />} />
      </Routes>
    </>
  );
};
