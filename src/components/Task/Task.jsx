import React from "react";
import styles from "./Task.module.css";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { RemoveIcon } from "../../icons/RemoveIcon";
import { EditIcon } from "../../icons/EditIcon";
import { removeTask } from "../../services/reducers/tasks";

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

  const handleRemoveTask = () => {
    dispatch(removeTask(id));
  };

  const setBgColor = (status, priority) => {
    if (status !== null) {
      return `${styles.task} ${styles.task_complete}`;
    } else if (status === null && priority === "high") {
      return `${styles.task} ${styles.task_highPriority}`;
    } else return styles.task;
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: onBoard,
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div className={setBgColor(status, priority)} ref={dragRef}>
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__icons}>
        <div className={styles.task__icon} onClick={openModal}>
          <EditIcon />
        </div>
        <div className={styles.task__icon} onClick={handleRemoveTask}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};
