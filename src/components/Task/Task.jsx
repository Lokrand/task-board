import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import remove from "../../images/remove.svg";
import edit from "../../images/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeQueueFromBoard } from "../../services/reducers/boards";
import { Reorder } from "framer-motion";

export const Task = ({ el, title, id, boardKey, openModal }) => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const task = useSelector((state) => state.modal.currentTask);
  // console.log("task", task);
  const removeTask = () => {
    dispatch(
      removeQueueFromBoard({
        id,
        boardKey,
      })
    );
  };

  return (
    <Reorder.Item
      value={el}
      id={el}
      whileDrag={{
        filter: "invert(1)",
      }}
    >
      <div className={styles.task}>
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
