import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard } from "../../services/boards/actions";
import { Board } from "../Board/Board";
import styles from "./Boards.module.css";
import { generateKeys } from "../../utils/generateKeys";
import { Cross } from "../../icons/Cross";
import { IBoards } from "../../services/types/data";

export const Boards: FC = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  const [newBoard, setNewBoard] = useState("");
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const board = useSelector((state) => state.boards.boards);

  const onClick = () => {
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
        status: false,
      })
    );
    setActive(false);
    setNewBoard("");
  };

  return (
    <section className={styles.boards}>
      {board.map((el: IBoards) => {
        return (
          <Board key={el.key} title={el.title} id={el.key} status={el.status} />
        );
      })}
      {active && (
        <div className={styles.boards__createBoard}>
          <textarea
            className={styles.boards__input}
            rows={1}
            placeholder="Enter the name of the new board..."
            id="textName"
            onChange={onChange}
          />
          {newBoard && (
            <div className={styles.tasks__cancel}>
              <button
                className={styles.tasks_addNewTaskButton}
                onClick={addBoard}
              >
                Add a board
              </button>
              <div className={styles.tasks__cross} onClick={closeInput}>
                <Cross />
              </div>
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
