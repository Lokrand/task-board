import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Board.module.css";

interface IBoard {
  title: string;
  id: string;
  status: string;
}

export const Board: FC<IBoard> = ({ title, id, status }) => {
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
