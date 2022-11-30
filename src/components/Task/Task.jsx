import React from "react";
import styles from "./Task.module.css";

export const Task = ({title}) => {
  return (
    <div className={styles.task}>
      <p>{title}</p>
    </div>
  );
};
