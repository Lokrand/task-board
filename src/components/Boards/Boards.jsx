import React from 'react';
import { Board } from '../Board/Board';
import styles from './Boards.module.css';

export const Boards = () => {
  const boards = [111,222,333,444,555]
  return (
    <section className={styles.boards}>
      {boards.map((el) => {
        return (
          <Board count={el}/>
        )
      })}
      <button className={styles.boards__button}>Add new board...</button>
    </section>
  )
}
