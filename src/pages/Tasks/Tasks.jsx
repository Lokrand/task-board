import React, { useState, useEffect } from "react";
import styles from "./Tasks.module.css";
import cross from "../../images/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { AddNewQueueTask } from "../../services/reducers/queue";
import { Task } from "../../components/Task/Task";
import { NavLink, useLocation } from "react-router-dom";
import {
  addQueueToBoard,
  changeBoardStatus,
  changeBoardTitleAction,
  removeBoardAction,
} from "../../services/reducers/boards";
import { generateKeys } from "../../utils/generateKeys";
import { Modal } from "../../components/Modal/Modal";
import { openModal, setCurrentTask } from "../../services/reducers/modal";
import { Reorder } from "framer-motion";
import edit from "../../images/edit.svg";

export const Tasks = () => {
  const [addNewTask, setAddNewTask] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [newQueue, setNewQueue] = useState();
  const [newQueueTitle, setNewQueueTitle] = useState("");
  const queueTasks = useSelector((state) => state.queue.tasks);
  const history = useLocation();
  const id = history.pathname.replace(/\/tasks\//g, "");
  const boards = useSelector((state) => state.boards.boards);
  const selectedBoard = boards.filter((el) => el.key === id)[0];
  const active = useSelector((state) => state.modal.active);
  const [showInputTitle, setShowInputTitle] = useState(false);
  const [changeInputTitleValue, setChangeInputTitleValue] = useState("");

  // console.log("selectedBoard", selectedBoard);

  const dispatch = useDispatch();

  const onClick = () => {
    setAddNewTask(true);
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

  const closeInput = () => {
    setAddNewTask(false);
  };

  useEffect(() => {
    dispatch(AddNewQueueTask(newQueue));
  }, [newQueue]);

  const time = new Date();

  const addNewQueue = () => {
    dispatch(
      addQueueToBoard({
        key: selectedBoard.key,
        title: newQueueTitle,
        date: time,
        id: generateKeys(),
      })
    );
    setNewQueue({
      time: time,
      title: newQueueTitle,
    });
    setAddNewTask(false);
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
              // onReorder={addNewQueue}
            >
              <div className={styles.tasks__items}>
                {selectedBoard.queue.map((el) => {
                  return (
                    <Task
                      key={el.id}
                      el={el}
                      title={el.title}
                      id={el.id}
                      board={selectedBoard.key}
                      openModal={() => {
                        dispatch(openModal());
                        dispatch(setCurrentTask(el));
                      }}
                    />
                  );
                })}

                {addNewTask && (
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
                {selectedBoard.developments.map((el) => {
                  return <Task title={el} />;
                })}
              </div>
            </Reorder.Group>

            <button className={styles.tasks__button}>Add a new task...</button>
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
                {selectedBoard.done.map((el) => {
                  return <Task title={el} />;
                })}
              </div>
            </Reorder.Group>
            <button className={styles.tasks__button}>Add a new task...</button>
          </div>
        </div>
      </section>
      {active && <Modal />}
    </>
  );
};
