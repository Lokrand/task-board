import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Board.module.css'

export const Board = ({title, id}) => {

  const onClick = (e) => {
    console.log(e.target)
  }

  return (
    <NavLink to={`/tasks/${id}`} className={styles.board} onClick={onClick}>
      <h3 className={styles.board__title}>{title}</h3>
    </NavLink>
  )
}
