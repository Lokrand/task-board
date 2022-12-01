import React from "react";
import styles from "./Task.module.css";
import remove from '../../images/remove.svg'
import edit from '../../images/edit.svg'
import { useDispatch } from "react-redux";
import { removeQueueFromBoard } from "../../services/reducers/boards";

export const Task = ({title, id, board}) => {
  const dispatch = useDispatch()
  const removeTask = () => {
    console.log('click', id, board)
    dispatch(removeQueueFromBoard({
      id,
      board
    }))
  }
  return (
    <div className={styles.task}>
      <p>{title}</p>
      <div className={styles.task__icons}>
        <img src={edit} alt="edit" className={styles.task__icon} />
        <img src={remove} alt="remove" className={styles.task__icon} onClick={removeTask}/>
      </div>
    </div>
  );
};
