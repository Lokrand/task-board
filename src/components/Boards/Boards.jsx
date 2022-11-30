import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard } from "../../services/reducers/boards";
import { Board } from "../Board/Board";
import styles from "./Boards.module.css";
import cross from "../../images/cross.svg";
import { generateKeys } from "../../utils/generateKeys";

export const Boards = () => {
  const dispatch = useDispatch();
  const boards = [111, 222, 333, 444, 555];
  const [active, setActive] = useState(false);
  const [newBoard, setNewBoard] = useState("");
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const board = useSelector((state) => state.boards.boards);
  console.log("board", board);

  const onClick = () => {
    // dispatch(addNewBoard({}))
    setActive(true);
  };

  const onChange = (e) => {
    if (e.target.value.length > 0) {
      setNewBoard(true);
      setNewBoardTitle(e.target.value);
    }
    if (e.target.value.length === 0) {
      setNewBoard(false);
    }
  };

  const closeInput = () => {
    setActive(false);
    setNewBoard("");
  };
  const date = new Date();
  const addBoard = () => {
    dispatch(
      addNewBoard({
        title: newBoardTitle,
        date: date,
        key: generateKeys(),
      })
    );
    setActive(false);
    setNewBoard("");
  };

  return (
    <section className={styles.boards}>
      {board.map((el) => {
        return <Board key={el.key} title={el.title} id={el.key} />;
      })}
      {active && (
        <div className={styles.boards__createBoard}>
          <textarea
            className={styles.boards__input}
            rows="1"
            placeholder="Enter the name of the new board..."
            id="textName"
            onChange={onChange}
          ></textarea>
          {newBoard && (
            <div className={styles.tasks__cancel}>
              <button
                className={styles.tasks_addNewTaskButton}
                onClick={addBoard}
              >
                Add a board
              </button>
              <img
                src={cross}
                alt="cross"
                className={styles.tasks__cross}
                onClick={closeInput}
              />
            </div>
          )}
        </div>
      )}
      <button className={styles.boards__button} onClick={onClick}>
        Add a new board...
      </button>
    </section>
  );
};
