import React, { useState, useEffect } from "react";
import styles from "./Tasks.module.css";
import cross from "../../images/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { AddNewQueueTask } from "../../services/reducers/queue";
import { Task } from "../../components/Task/Task";
import { useLocation } from "react-router-dom";
import { addQueueToBoard } from "../../services/reducers/boards";
import { generateKeys } from "../../utils/generateKeys";
import { Modal } from "../../components/Modal/Modal";
import { openModal } from "../../services/reducers/modal";

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

  console.log("selectedBoard", selectedBoard);

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

  const developments = [1, 2, 3, 4, 5];
  const dones = [1, 2, 3];

  return (
    <>
      <section className={styles.tasks}>
        <h2 className={styles.tasks__title}>{selectedBoard.title}</h2>
        <div className={styles.tasks__columns}>
          <div className={styles.tasks__column}>
            <h3 className={styles.tasks__taskName}>Queue</h3>
            <div className={styles.tasks__items}>
              {selectedBoard.queue.map((el) => {
                return (
                  <Task
                    key={el.id}
                    title={el.title}
                    id={el.id}
                    board={selectedBoard.key}
                    openModal={() => {
                      dispatch(openModal())
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
            <button className={styles.tasks__button} onClick={onClick}>
              Add a new task...
            </button>
          </div>
          <div className={styles.tasks__column}>
            <h3 className={styles.tasks__taskName}>Development</h3>
            <div className={styles.tasks__items}>
              {developments.map((el) => {
                return <Task title={el} />;
              })}
            </div>

            <button className={styles.tasks__button}>Add a new task...</button>
          </div>
          <div className={styles.tasks__column}>
            <h3 className={styles.tasks__taskName}>Done</h3>
            <div className={styles.tasks__items}>
              {dones.map((el) => {
                return <Task title={el} />;
              })}
            </div>
            <button className={styles.tasks__button}>Add a new task...</button>
          </div>
        </div>
      </section>
      {active && <Modal />}
    </>
  );
};
