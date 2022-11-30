import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logoTB.svg";
import { BoardsIcon } from "../../icons/BoardsIcon";

export const Header = () => {
  return (
    <section className={styles.section}>
      <button className={styles.button}>
        {/* <img src={boards} alt="logo" className={styles.button__image}/> */}
        <BoardsIcon />
        <p className={styles.button__text}>Boards</p>
      </button>
      <div className={styles.logo}>
        <h1 className={styles.title}>Task Board</h1>
        <img src={logo} alt="logo" />
      </div>
    </section>
  );
};
