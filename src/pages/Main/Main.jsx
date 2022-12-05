import React from 'react';
import { Boards } from '../../components/Boards/Boards';
import styles from './Main.module.css';
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export const Main = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.main__title}>My boards</h2>
      <Boards />
    </section>
    
  )
}
