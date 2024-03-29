import React, { useState, useEffect, FC, ChangeEventHandler } from "react";
import styles from "./Modal.module.css";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { closeModalAction, setCurrentTask } from "../../services/modal/actions";
import { getDate } from "../../utils/date";
import Moment from "react-moment";
import { ArrowPriority } from "../../icons/ArrowPriority";
import {
  changeTitleTasks,
  removeEndTimeTasks,
  setDescriptionTasks,
  setEndTimeTasks,
  changeTaskPriorityHigh,
  changeTaskPriorityLow,
  sortByPriority,
  closeTaskAction,
  changeTaskStatus,
} from "../../services/tasks/actions";
import { Cross } from "../../icons/Cross";
import { Subtasks } from "../Subtasks/Subtasks";
import { useTypedSelector } from "../../hooks/useSelector";

export const Modal: FC = () => {
  const [inputActive, setInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInputChangeTitle, setShowInputChangeTitle] = useState(false);
  const [valueInputChangeTitle, setValueInputChangeTitle] = useState("");
  const [buttonEndTaskActive, setButtonEndTaskActive] = useState(true);
  const [priority, setPriority] = useState("low");
  const active = useTypedSelector((state) => state.modal.active);
  const task = useTypedSelector((state) => state.modal.currentTask);
  let dateEndTask = "In progress";

  if (task.endTime) dateEndTask = getDate(task.endTime);

  const date = getDate(task.date);

  let timeInProgressArr;
  let timeInprogress;
  if (task.date.length > 0) {
    timeInProgressArr = task.date.split(":");
    timeInprogress = `${timeInProgressArr[0]}:${timeInProgressArr[1]}-0000`;
  }

  const dispatch = useDispatch();

  const addDescription = () => {
    setInputActive(true);
  };
  const goBack = () => {
    setInputActive(false);
  };
  const onChangeInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
  };

  const closeModal = () => {
    console.log("task", task);
    if (task.endTime === null) {
      dispatch(changeTaskStatus({ id: task.id, status: "queue" }));
    } else {
      dispatch(closeTaskAction({ id: task.id }));
    }
    dispatch(closeModalAction());
    dispatch(setCurrentTask({}));
  };
  const closeTask = () => {
    setButtonEndTaskActive(false);
    dispatch(setEndTimeTasks({ id: task.id, endTime: new Date() }));
  };

  const activateTask = () => {
    setButtonEndTaskActive(true);
    dispatch(removeEndTimeTasks(task.id));
  };

  const changePriority = () => {
    if (task.priority === "low") {
      dispatch(changeTaskPriorityHigh(task.id));
      setPriority("high");
    } else {
      dispatch(changeTaskPriorityLow(task.id));
      setPriority("low");
    }
    dispatch(sortByPriority());
  };

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        dispatch(closeModalAction());
        closeModal();
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
    
    dispatch(setDescriptionTasks({ id: task.id, description: inputValue }));
    setInputActive(false);
    
  };

  const changeTitle = () => {
    dispatch(changeTitleTasks({ id: task.id, title: valueInputChangeTitle }));
    setShowInputChangeTitle(false);
  };

  const showChangeTitleInput = () => {
    setShowInputChangeTitle(true);
  };

  const hideChangeTitleInput = () => {
    setShowInputChangeTitle(false);
  };
  
  const changeTitleText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValueInputChangeTitle(e.target.value);
  };

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <div className={styles.modal__statuts}>
            <div className={styles.modal__block}>
              <div className={styles.modal__title}>
                <p>#2</p>
                <div>
                  {showInputChangeTitle ? (
                    <div>
                      <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={5}
                        placeholder={task.title}
                        className={styles.modal__changeTitleInput}
                        onChange={changeTitleText}
                      ></textarea>
                      <div className={styles.modal__blockChangeTitle}>
                        <button
                          className={styles.modal__changeTitleButton}
                          onClick={changeTitle}
                        >
                          Set title
                        </button>
                        <div
                          className={styles.modal__hideInputChangeTitleCross}
                          onClick={hideChangeTitleInput}
                        >
                          <Cross />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p
                      onClick={showChangeTitleInput}
                      className={styles.modal__titleText}
                    >
                      {task.title}
                    </p>
                  )}
                </div>
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
          <div className={styles.modal__cross} onClick={closeModal}>
            <Cross />
          </div>

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
                  rows={10}
                  placeholder="Enter the description"
                  id="textName"
                  onChange={onChangeInput}
                ></textarea>
                <div className={styles.modal__buttons}>
                  <button
                    className={styles.modal__confirm}
                    onClick={setDescriptionText}
                  >
                    Confirm
                  </button>
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
                {task.description !== ""
                  ? "Change description"
                  : "Add description"}
              </button>
            )}
          </div>
        </div>
        <Subtasks />
        <div className={styles.modal__comments}>
          <button>Add comment</button>
        </div>
      </div>
    </div>,
    document.getElementById("modals")!
  );
};
