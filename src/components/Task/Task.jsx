import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import remove from "../../images/remove.svg";
import edit from "../../images/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeQueueFromBoard } from "../../services/reducers/boards";
import { Reorder } from "framer-motion";
import { getDefaultCompilerOptions } from "typescript";
import { removeCompletedTask } from "../../services/reducers/done";
import { removeQueue } from "../../services/reducers/queue";
import { removeDevelopment } from "../../services/reducers/development";

export const Task = ({
  el,
  title,
  id,
  openModal,
  status,
  priority,
  onBoard,
}) => {
  const dispatch = useDispatch();
  console.log(onBoard)
  const removeTask = () => {
    if (onBoard === 'queue') {
      dispatch(removeQueue(id));
      dispatch(removeCompletedTask(id));
    } else if (onBoard === 'development') {
      dispatch(removeDevelopment(id))
    } else {
      dispatch(removeCompletedTask(id));
    }
  };

  const setBgColor = (status, priority) => {
    if (status !== null) {
      return `${styles.task} ${styles.task_complete}`;
    } else if (status === null && priority === "high") {
      return `${styles.task} ${styles.task_highPriority}`;
    } else return styles.task;
  };

  return (
    <Reorder.Item
      value={el}
      id={el}
      whileDrag={{
        filter: "invert(1)",
      }}
    >
      <div className={setBgColor(status, priority)}>
        <p className={styles.task__title}>{title}</p>
        <div className={styles.task__icons}>
          <img
            src={edit}
            alt="edit"
            className={styles.task__icon}
            onClick={openModal}
          />
          <img
            src={remove}
            alt="remove"
            className={styles.task__icon}
            onClick={removeTask}
          />
        </div>
      </div>
    </Reorder.Item>
  );
};
