import React, { FC } from "react";
import styles from "./Button.module.css";

interface IButton {
  onClick: VoidFunction;
  title: string;
  color: string;
}

export const Button: FC<IButton> = ({ onClick, title, color }) => {
  let bgColor;
  if (color === "red") {
    bgColor = styles.button_red;
  } else if (color === "purple") {
    bgColor = styles.button_purple;
  } else if (color === "yellow") {
    bgColor = styles.button_yellow;
  } else if (color === "green") {
    bgColor = styles.button_green;
  } else if (color === "orange") {
    bgColor = styles.button_orange;
  }
  return (
    <button onClick={onClick} className={`${styles.button} ${bgColor}`}>
      {title}
    </button>
  );
};
