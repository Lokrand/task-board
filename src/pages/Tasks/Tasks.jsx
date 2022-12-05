import React, { useState, useEffect } from "react";
import styles from "./Tasks.module.css";
import cross from "../../images/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  AddNewQueueTask,
  getReorderQueue,
  sortByPriority,
} from "../../services/reducers/queue";
import { Task } from "../../components/Task/Task";
import { NavLink, useLocation } from "react-router-dom";
import {
  addQueueToBoard,
  changeBoardStatus,
  changeBoardTitleAction,
  removeBoardAction,
  reorderQueue,
} from "../../services/reducers/boards";
import { generateKeys } from "../../utils/generateKeys";
import { Modal } from "../../components/Modal/Modal";
import {
  closeModalAction,
  openModal,
  setCurrentBoard,
  setCurrentTask,
} from "../../services/reducers/modal";
import { Reorder, useUnmountEffect } from "framer-motion";
import edit from "../../images/edit.svg";
import { addDevelopmentTask } from "../../services/reducers/development";

export const Tasks = () => {
  const [addNewTaskQueue, setAddNewTaskQueue] = useState(false);
  const [addNewTaskDevelopment, setAddNewTaskDevelopment] = useState(false);
  const [addNewTaskDone, setAddNewTaskDone] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [newQueue, setNewQueue] = useState();
  const [newQueueTitle, setNewQueueTitle] = useState("");
  const [newDevelopmentTitle, setNewDevelopmentTitle] = useState("");
  const [newDoneTitle, setNewDoneTitle] = useState("");
  const history = useLocation();
  const id = history.pathname.replace(/\/tasks\//g, "");
  const boards = useSelector((state) => state.boards.boards);
  const selectedBoard = boards.filter((el) => el.key === id)[0];
  const queueTasks = useSelector((state) => state.queue.tasks);
  const doneTasks = useSelector((state) => state.done.tasks);
  const developmentTasks = useSelector((state) => state.development.tasks);
  const queueListForSelectedBoard = queueTasks.filter(
    (el) => el.key === selectedBoard.key
  );
  const doneListForSelectedBoard = doneTasks.filter(
    (el) => el.key === selectedBoard.key
  );
  const developmentListForSelectedBoard = developmentTasks.filter(
    (el) => el.key === selectedBoard.key
  );

  console.log("developmentTasks", developmentTasks);
  console.log(
    "developmentListForSelectedBoard",
    developmentListForSelectedBoard
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
      AddNewQueueTask({
        key: selectedBoard.key,
        title: newQueueTitle,
        date: time,
        id: generateKeys(),
        endTime: null,
        description: "",
        priority: "low",
        status: "queue",
        number: 0,
        subtasks: [],
        comments: [],
        subComments: [],
      })
    );
    setNewQueue({
      time: time,
      title: newQueueTitle,
    });
    setAddNewTaskQueue(false);
  };

  const addNewDevelopment = () => {
    dispatch(
      addDevelopmentTask({
        key: selectedBoard.key,
        title: newDevelopmentTitle,
        date: time,
        id: generateKeys(),
        endTime: null,
        description: "",
        priority: "low",
        status: "development",
        number: 0,
        subtasks: [],
        comments: [],
        subComments: [],
      })
    );
    setAddNewTaskDevelopment(false);
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
                <img
                  src={cross}
                  alt="cross"
                  className={styles.tasks__cross}
                  onClick={hideChangeTitleInput}
                />
              </div>
            ) : (
              <img
                src={edit}
                alt="edit"
                className={styles.tasks__icon}
                onClick={changeBoardTitle}
              />
            )}
          </div>
          <div className={styles.tasks__boardStatus}>
            {selectedBoard.status ? (
              <NavLink
                to="/"
                className={styles.tasks__inactiveButton}
                onClick={unFinishBoard}
              >
                Unfinish
              </NavLink>
            ) : (
              <NavLink
                to="/"
                className={styles.tasks__completeButton}
                onClick={finishBoard}
              >
                Finish
              </NavLink>
            )}
            <NavLink
              to="/"
              className={styles.tasks__removeButton}
              onClick={removeBoard}
            >
              Remove board
            </NavLink>
          </div>
        </div>
        <div className={styles.tasks__columns}>
          <div className={styles.tasks__column}>
            <h3 className={styles.tasks__taskName}>Queue</h3>
            <Reorder.Group
              as="ol"
              axys="y"
              values={selectedBoard.queue}
              onReorder={(newOrder) => {
                dispatch(getReorderQueue(newOrder));
              }}
              // onReorder={(newOrder) => {dispatch(reorderQueue({key: selectedBoard.key, queue: newOrder}))}}
            >
              <div className={styles.tasks__items}>
                {queueListForSelectedBoard.map((el) => {
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
                        <img
                          src={cross}
                          alt="cross"
                          className={styles.tasks__cross}
                          onClick={closeInput}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Reorder.Group>
            <button className={styles.tasks__button} onClick={onClick}>
              Add a new task...
            </button>
          </div>
          <div className={styles.tasks__column}>
            <h3 className={styles.tasks__taskName}>Development</h3>
            <Reorder.Group
              as="ol"
              axys="y"
              values={selectedBoard.queue}
              // onReorder={setItem}
            >
              <div className={styles.tasks__items}>
                {developmentListForSelectedBoard.map((el) => {
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
                {addNewTaskDevelopment && (
                  <>
                    <textarea
                      className={styles.tasks__input}
                      rows="1"
                      placeholder="Enter the name of the new task..."
                      id="textName"
                      onChange={onChangeDevelopmentInput}
                    ></textarea>
                    {showAddButton && (
                      <div className={styles.tasks__cancel}>
                        <button
                          className={styles.tasks_addNewTaskButton}
                          onClick={addNewDevelopment}
                        >
                          Add a task
                        </button>
                        <img
                          src={cross}
                          alt="cross"
                          className={styles.tasks__cross}
                          onClick={closeDevelopmentInput}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Reorder.Group>

            <button
              className={styles.tasks__button}
              onClick={showInputAddNewDevelopment}
            >
              Add a new task...
            </button>
          </div>
          <div className={styles.tasks__column}>
            <h3 className={styles.tasks__taskName}>Done</h3>
            <Reorder.Group
              as="ol"
              axys="y"
              values={selectedBoard.queue}
              // onReorder={setItem}
            >
              <div className={styles.tasks__items}>
                {doneListForSelectedBoard.map((el) => {
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
                        console.log("mytask in tasks", el);
                      }}
                    />
                  );
                })}
              </div>
            </Reorder.Group>
          </div>
        </div>
      </section>
      {active && <Modal />}
    </>
  );
};
