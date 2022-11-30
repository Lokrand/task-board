import React from 'react'
import styles from './Board.module.css'

export const Board = ({count}) => {
  return (
    <div className={styles.board}>
      <h3 className={styles.board__title}>Board's name {count}</h3>
    </div>
  )
}
