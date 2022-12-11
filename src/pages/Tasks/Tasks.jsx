import React, { useState } from "react";
import styles from "./Tasks.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Task } from "../../components/Task/Task";
import { NavLink, useParams } from "react-router-dom";
import {
  changeBoardStatus,
  changeBoardTitleAction,
  removeBoardAction,
} from "../../services/reducers/boards";
import { Modal } from "../../components/Modal/Modal";
import {
  openModal,
  setCurrentBoard,
  setCurrentTask,
} from "../../services/reducers/modal";
import { useDrop } from "react-dnd";
import { EditIcon } from "../../icons/EditIcon";
import { Cross } from "../../icons/Cross";
import { addNewTask, changeTaskStatus } from "../../services/reducers/tasks";

export const Tasks = () => {
  const [addNewTaskQueue, setAddNewTaskQueue] = useState(false);
  const [addNewTaskDevelopment, setAddNewTaskDevelopment] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [newQueue, setNewQueue] = useState();
  const [newQueueTitle, setNewQueueTitle] = useState("");
  const [newDevelopmentTitle, setNewDevelopmentTitle] = useState("");
  const { id } = useParams();

  const boards = useSelector((state) => state.boards.boards);
  const selectedBoard = boards.filter((el) => el.key === id)[0];
  const queueTasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (el) => el.key === selectedBoard.key && el.status === "queue"
    )
  );
  const doneTasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (el) => el.key === selectedBoard.key && el.status === "done"
    )
  );
  const developmentTasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (el) => el.key === selectedBoard.key && el.status === "development"
    )
  );

  const active = useSelector((state) => state.modal.active);
  const [showInputTitle, setShowInputTitle] = useState(false);
  const [changeInputTitleValue, setChangeInputTitleValue] = useState("");
  const dispatch = useDispatch();

  const onClick = () => {
    setAddNewTaskQueue(true);
  };
  const showInputAddNewDevelopment = () => {
    setAddNewTaskDevelopment(true);
  };

  const onChange = (e) => {
    if (e.target.value.length > 0) {
      setShowAddButton(true);
      setNewQueueTitle(e.target.value);
    }
    if (e.target.value.length === 0) {
      setShowAddButton(false);
    }
  };

  const onChangeDevelopmentInput = (e) => {
    if (e.target.value.length > 0) {
      setShowAddButton(true);
      setNewDevelopmentTitle(e.target.value);
    }
    if (e.target.value.length === 0) {
      setShowAddButton(false);
    }
  };
  const closeInput = () => {
    setAddNewTaskQueue(false);
  };
  const closeDevelopmentInput = () => {
    setAddNewTaskDevelopment(false);
  };

  const time = new Date();

  const addNewQueue = () => {
    dispatch(
      addNewTask({
        key: selectedBoard.key,
        title: newQueueTitle,
        date: time,
      })
    );
    setNewQueue({
      time: time,
      title: newQueueTitle,
    });
    setAddNewTaskQueue(false);
  };

  const changeBoardTitle = () => {
    setShowInputTitle(true);
  };
  const saveBoardNewTitle = () => {
    dispatch(
      changeBoardTitleAction({
        key: selectedBoard.key,
        title: changeInputTitleValue,
      })
    );
    setShowInputTitle(false);
  };

  const finishBoard = () => {
    dispatch(changeBoardStatus({ key: selectedBoard.key, status: true }));
  };
  const unFinishBoard = () => {
    dispatch(changeBoardStatus({ key: selectedBoard.key, status: false }));
  };

  const hideChangeTitleInput = () => {
    setShowInputTitle(false);
  };

  const removeBoard = () => {
    dispatch(removeBoardAction({ key: selectedBoard.key }));
  };

  const handleDrop = (id, status) => {
    dispatch(changeTaskStatus({ id, status }));
  };

  const [, dropOnDevelopment] = useDrop(() => ({
    accept: ["queue", "done"],
    drop: (item) => handleDrop(item.id, "development"),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [, dropOnQueue] = useDrop(() => ({
    accept: ["development", "done"],
    drop: (item) => handleDrop(item.id, "queue"),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [, dropOnDone] = useDrop(() => ({
    accept: ["development", "queue"],
    drop: (item) => handleDrop(item.id, "done"),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <>
      <section className={styles.tasks}>
        <div className={styles.tasks__header}>
          <div className={styles.tasks__titleBlock}>
            <h2 className={styles.tasks__title}>{selectedBoard.title}</h2>
            {showInputTitle ? (
              <div className={styles.tasks__changeTitleBlock}>
                <input
                  type="text"
                  placeholder="Enter a new title..."
                  className={styles.tasks__changeTitleInput}
                  onChange={(e) => {
                    setChangeInputTitleValue(e.target.value);
                  }}
                />
                <button
                  className={styles.tasks__saveTitleButton}
                  onClick={saveBoardNewTitle}
                >
                  Save
                </button>
                <div
                  className={styles.tasks__cross}
                  onClick={hideChangeTitleInput}
                >
                  <Cross />
                </div>
              </div>
            ) : (
              <div className={styles.tasks__icon} onClick={changeBoardTitle}>
                <EditIcon />
              </div>
            )}
          </div>
          <div className={styles.tasks__boardStatus}>
            {selectedBoard.status ? (
              <NavLink
                to="/task-board"
                className={styles.tasks__inactiveButton}
                onClick={unFinishBoard}
              >
                Unfinish
              </NavLink>
            ) : (
              <NavLink
                to="/task-board"
                className={styles.tasks__completeButton}
                onClick={finishBoard}
              >
                Finish
              </NavLink>
            )}
            <NavLink
              to="/task-board"
              className={styles.tasks__removeButton}
              onClick={removeBoard}
            >
              Remove board
            </NavLink>
          </div>
        </div>
        <div className={styles.tasks__columns}>
          <div className={styles.tasks__column} ref={dropOnQueue}>
            <h3 className={styles.tasks__taskName}>Queue</h3>

            <div className={styles.tasks__items}>
              {queueTasks.map((el) => {
                return (
                  <Task
                    key={el.id}
                    el={el}
                    title={el.title}
                    id={el.id}
                    status={el.endTime}
                    priority={el.priority}
                    onBoard={el.status}
                    openModal={() => {
                      dispatch(openModal());
                      dispatch(setCurrentTask(el));
                      dispatch(setCurrentBoard(selectedBoard));
                    }}
                  />
                );
              })}

              {addNewTaskQueue && (
                <>
                  <textarea
                    className={styles.tasks__input}
                    rows="1"
                    placeholder="Enter the name of the new task..."
                    id="textName"
                    onChange={onChange}
                  ></textarea>
                  {showAddButton && (
                    <div className={styles.tasks__cancel}>
                      <button
                        className={styles.tasks_addNewTaskButton}
                        onClick={addNewQueue}
                      >
                        Add a task
                      </button>
                      <div className={styles.tasks__cross} onClick={closeInput}>
                        <Cross />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <button className={styles.tasks__button} onClick={onClick}>
              Add a new task...
            </button>
          </div>
          <div className={styles.tasks__column} ref={dropOnDevelopment}>
            <h3 className={styles.tasks__taskName}>Development</h3>
            <div className={styles.tasks__items}>
              {developmentTasks.map((el) => {
                return (
                  <Task
                    key={el.id}
                    el={el}
                    title={el.title}
                    id={el.id}
                    status={el.endTime}
                    priority={el.priority}
                    onBoard={el.status}
                    openModal={() => {
                      dispatch(openModal());
                      dispatch(setCurrentTask(el));
                      dispatch(setCurrentBoard(selectedBoard));
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.tasks__column} ref={dropOnDone}>
            <h3 className={styles.tasks__taskName}>Done</h3>

            <div className={styles.tasks__items}>
              {doneTasks.map((el) => {
                return (
                  <Task
                    key={el.id}
                    el={el}
                    title={el.title}
                    id={el.id}
                    status={el.endTime}
                    priority={el.priority}
                    onBoard={el.status}
                    openModal={() => {
                      dispatch(openModal());
                      dispatch(setCurrentTask(el));
                      dispatch(setCurrentBoard(selectedBoard));
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {active && <Modal />}
    </>
  );
};
