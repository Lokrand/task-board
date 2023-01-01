import React, { FC } from 'react'
import styles from './Button.module.css';

interface IButton {
  onClick: VoidFunction;
  title: string;
}

export const Button: FC<IButton> = ({onClick, title}) => {
  return (
    <button onClick={onClick} className={styles.button}  >
      {title}
    </button>
  )
}
