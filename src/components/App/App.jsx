import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from "../../pages/Main/Main";
import "./App.module.css";
import { Tasks } from "../../pages/Tasks/Tasks";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/task-board" element={<Main />} />
        <Route path="/tasks/:id" element={<Tasks />} />
      </Routes>
    </>
  );
};
