import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import cross from "../../images/cross.svg";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalAction,
  setCurrentTask,
} from "../../services/reducers/modal";
import { getDate } from "../../utils/date";
import Moment from "react-moment";
import { setTaskEndTime } from "../../services/reducers/boards";
import { ArrowPriority } from "../../icons/ArrowPriority";
import {
  changeTaskPriorityHigh,
  changeTaskPriorityLow,
  removeEndTimeQueue,
  removeQueueByPriority,
  setEndTimeQueue,
  sortByPriority,
} from "../../services/reducers/queue";
import { addCompletedTask, removeCompletedTask, removeEndTimeDone, setEndTimeDone } from "../../services/reducers/done";

export const Modal = () => {
  const [inputActive, setInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [buttonEndTaskActive, setButtonEndTaskActive] = useState(true);
  const [priority, setPriority] = useState("low");
  const active = useSelector((state) => state.modal.active);
  const task = useSelector((state) => state.modal.currentTask);
  const board = useSelector((state) => state.modal.currentBoard);
  let dateEndTask = "In progress";
  if (task.endTime) dateEndTask = getDate(task.endTime);

  let findStatus;
  let taskStatus;
  if (board.queue) {
    findStatus = board.queue.filter((el) => el.id === task.id);
    if (findStatus) taskStatus = "Queue";
  } else if (board.development) {
    findStatus = board.development.filter((el) => el.id === task.id);
    if (findStatus) taskStatus = "Development";
  } else {
    findStatus = board.done.filter((el) => el.id === task.id);
    if (findStatus) taskStatus = "Done";
  }
  const date = getDate(task.date);
  let timeInProgressArr;
  let timeInprogress;
  if (task.date.length > 0) {
    timeInProgressArr = task.date.split(":");
    timeInprogress = `${timeInProgressArr[0]}:${timeInProgressArr[1]}-0000`;
  }
  // console.log("timeInprogress", timeInprogress);
  // console.log(task.date);
  // console.log("board", board);
  // console.log("task", task);
  const dispatch = useDispatch();
  const addDescription = () => {
    setInputActive(true);
  };
  const goBack = () => {
    setInputActive(false);
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  
  const closeModal = () => {
    if (task.endTime === null) {
      dispatch(removeCompletedTask(task.id));
    } else {
      console.log('task', task)
      dispatch(addCompletedTask(task))
      dispatch(removeQueueByPriority(task.id));
    }
    dispatch(closeModalAction());
    dispatch(setCurrentTask([]));
  };
  const closeTask = () => {
    setButtonEndTaskActive(false);
    const endTime = new Date();
    // task.endTime = endTime;
    // const endTime = new Date();
    if (task.status === 'queue') {
      dispatch(setEndTimeQueue({id: task.id, endTime: endTime}))
    } else if (task.status === 'done') {
      dispatch(setEndTimeDone({id: task.id, endTime: endTime}))
    } else {

    }
    // dispatch(setTaskEndTime({ task: task, key: board.key }));
  };
  
  const activateTask = () => {
    setButtonEndTaskActive(true);
    // task.endTime = null;
    if (task.status === 'queue') {
      dispatch(removeEndTimeQueue(task.id))
    } else if (task.status === 'done') {
      dispatch(removeEndTimeDone(task.id))
    } else {}
    // dispatch(setTaskEndTime({ task: task, key: board.key }));
  };

  const changePriority = () => {
    if (task.priority === "low") {
      dispatch(changeTaskPriorityHigh(task.id));
      setPriority("high");
    } else {
      dispatch(changeTaskPriorityLow(task.id));
      setPriority("low");
    }
    dispatch(sortByPriority())
  };

  
  
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        dispatch(closeModalAction());
        closeModal()
      }
    }
    if (active) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [active]);

  const setDescriptionText = () => {
    dispatch(setDescriptionText({id: task.id, description: inputValue}))
    setInputActive(false)
  }

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <div className={styles.modal__statuts}>
            <div className={styles.modal__block}>
              <div className={styles.modal__title}>
                <p>#2 - </p>
                <p>{task.title}</p>
              </div>
              <p className={styles.modal__date}>Created at: {date}</p>

              <p className={styles.modal__date}>
                Time in progress:{" "}
                <Moment fromNow ago>
                  {timeInprogress}
                </Moment>
              </p>
              <p className={styles.modal__date}>End at: {dateEndTask}</p>
            </div>
            <div className={styles.modal__status}>
              <p>Status: {task.status}</p>
              <div className={styles.modal__priority}>
                <p
                  className={
                    task.priority === "low"
                      ? styles.modal__priorityStatus
                      : `${styles.modal__priorityStatus} ${styles.modal__priorityStatus_active}`
                  }
                >
                  Priority: {task.priority}
                </p>
                <div
                  className={
                    task.priority === "low"
                      ? styles.modal__changePriority
                      : `${styles.modal__changePriority} ${styles.modal__changePriority_active}`
                  }
                  onClick={changePriority}
                >
                  <ArrowPriority priority={task.priority} />
                  <p>{task.priority === "low" ? "Upgrade" : "Lower"}</p>
                </div>
              </div>
            </div>
          </div>
          <img
            src={cross}
            alt="cross"
            className={styles.modal__cross}
            onClick={closeModal}
          />
          {task.endTime === null ? (
            <button
              className={styles.modal__closeTaskButton}
              onClick={closeTask}
            >
              Finish the task
            </button>
          ) : (
            <button
              className={styles.modal__activateTaskButton}
              onClick={activateTask}
            >
              Activate
            </button>
          )}
        </div>
        <div className={styles.modal__description}>
          <p className={styles.modal__descriptionTitle}>Description:</p>
          <div className={styles.modal__addDescriptionBlock}>
            <p className={styles.modal__descriptionText}>{task.description}</p>
            {inputActive && (
              <>
                <textarea
                  className={styles.modal__input}
                  rows="10"
                  placeholder="Enter the description"
                  id="textName"
                  onChange={onChangeInput}
                ></textarea>
                <div className={styles.modal__buttons}>
                  <button className={styles.modal__confirm} onClick={setDescriptionText}>Confirm</button>
                  <button className={styles.modal__cancel} onClick={goBack}>
                    Cancel
                  </button>
                </div>
              </>
            )}
            {!inputActive && (
              <button
                className={styles.modal__descriptionButton}
                onClick={addDescription}
              >
                Add description
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};
