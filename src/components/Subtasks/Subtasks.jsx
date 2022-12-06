import React, { useState } from "react";
import styles from "./Subtasks.module.css";

export const Subtasks = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputNewSubtaskValue, setInputNewSubtaskValue] = useState("");
  const [inputNewSubtaskError, setInputNewSubtaskError] = useState(false);

  const onChangeNewSubtaskInput = (e) => {
    if (e.target.value.length > 30) {
      setInputNewSubtaskError(true);
    } else {
      setInputNewSubtaskValue(e.target.value);
    }
  };

  const letShowInput = () => {
    setShowInput(true);
  };

  return (
    <div className={styles.subtasks}>
      <h3 className={styles.subtasks__title}>Subtasks</h3>
      <div className={styles.subtasks__items}>
        <div className={styles.subtasks__item}></div>
      </div>
      <div>
        <div className={styles.subtasks__addNewSubtaskBlock}>
          <input
            type="text"
            placeholder="Set a new subtask title"
            className={styles.subtasks__addSubtaskInput}
            onChange={onChangeNewSubtaskInput}
          />
          <p className={styles.subtasks__inputError}>
            The title of the subtask cannot exceed 30 symbols
          </p>
        </div>
        <div className={styles.subtasks__addNewSubtaskButtons}>
          <button className={styles.subtasks__createSubtask}>Create subtask</button>
          <button>Cancel</button>
        </div>
      </div>
      <button
        onClick={letShowInput}
        className={styles.subtasks__addSubtaskButton}
      >
        Add subtask
      </button>
    </div>
  );
};
