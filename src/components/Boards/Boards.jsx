import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewBoard } from '../../services/reducers/boards';
import { Board } from '../Board/Board';
import styles from './Boards.module.css';

export const Boards = () => {
  const dispatch = useDispatch();
  const boards = [111,222,333,444,555]
  
  const onClick = () => {
    dispatch(addNewBoard({}))
  }

  return (
    <section className={styles.boards}>
      {boards.map((el) => {
        return (
          <Board count={el}/>
        )
      })}
      <button className={styles.boards__button} onClick={onClick}>Add new board...</button>
    </section>
  )
}
