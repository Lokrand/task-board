import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import remove from '../../images/remove.svg'
import edit from '../../images/edit.svg'
import { useDispatch } from "react-redux";
import { removeQueueFromBoard } from "../../services/reducers/boards";

export const Task = ({title, id, boardKey, openModal}) => {
  const dispatch = useDispatch()
  const [modalActive, setModalActive] = useState(false)
  const removeTask = () => {
    dispatch(removeQueueFromBoard({
      id,
      boardKey
    }))
  }

  return (
    <div className={styles.task}>
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__icons}>
        <img src={edit} alt="edit" className={styles.task__icon} onClick={openModal}/>
        <img src={remove} alt="remove" className={styles.task__icon} onClick={removeTask}/>
      </div>
    </div>
  );
};
