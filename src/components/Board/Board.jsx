import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Board.module.css";

export const Board = ({ title, id, status }) => {
  return (
    <NavLink
      to={`/tasks/${id}`}
      className={
        status ? `${styles.board} ${styles.board__complete}` : styles.board
      }
    >
      <h3 className={styles.board__title}>{title}</h3>
    </NavLink>
  );
};
