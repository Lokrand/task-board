import React from "react";
import styles from "./Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { RemoveIcon } from "../../icons/RemoveIcon";
import { EditIcon } from "../../icons/EditIcon";
import { removeTask } from "../../services/reducers/tasks";
import {
  openModal,
  setCurrentBoard,
  setCurrentTask,
} from "../../services/modal/modal";

export const Task = ({ el }) => {
  const { title, id, endTime, priority, status } = el;
  const dispatch = useDispatch();
  const selectedBoard = useSelector((state) =>
    state.boards.boards.find((board) => board.key === el.key)
  );
  const handleRemoveTask = () => {
    dispatch(removeTask(id));
  };

  const handleOpenModal = () => {
    dispatch(openModal());
    dispatch(setCurrentTask(el));
    dispatch(setCurrentBoard(selectedBoard));
  };

  const setBgColor = (status, priority) => {
    if (status !== null) {
      return `${styles.task} ${styles.task_complete}`;
    } else if (status === null && priority === "high") {
      return `${styles.task} ${styles.task_highPriority}`;
    } else return styles.task;
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: status,
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div className={setBgColor(endTime, priority)} ref={dragRef}>
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__icons}>
        <div className={styles.task__icon} onClick={handleOpenModal}>
          <EditIcon />
        </div>
        <div className={styles.task__icon} onClick={handleRemoveTask}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};
