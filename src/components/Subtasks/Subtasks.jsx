import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Subtasks.module.css";

export const Subtasks = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputNewSubtaskValue, setInputNewSubtaskValue] = useState("");
  const [inputNewSubtaskError, setInputNewSubtaskError] = useState(false);

  const onChangeNewSubtaskInput = (e) => {
    setInputNewSubtaskValue(e.target.value);
  };

  useEffect(() => {
    if (inputNewSubtaskValue.length > 30) {
      setInputNewSubtaskError(true);
    } else {
      setInputNewSubtaskError(false);
    }
  }, [inputNewSubtaskValue]);
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
          {inputNewSubtaskError && (
            <p className={styles.subtasks__inputError}>
              The title of the subtask cannot exceed 30 symbols
            </p>
          )}
        </div>
        {!inputNewSubtaskError && <div className={styles.subtasks__addNewSubtaskButtons}>
          <Button color="green" title="Create" />
          <Button color="red" title="Cancel" />
        </div>}
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
