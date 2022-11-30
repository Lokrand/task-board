import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logoTB.svg";
import { BoardsIcon } from "../../icons/BoardsIcon";
import { NavLink } from "react-router-dom";

export const Header = () => {

  return (
    <section className={styles.section}>
      <NavLink to='/' className={styles.button}>
        {/* <img src={boards} alt="logo" className={styles.button__image}/> */}
        <BoardsIcon />
        <p className={styles.button__text}>Boards</p>
      </NavLink>
      <div className={styles.logo}>
        <h1 className={styles.title}>Task Board</h1>
        <img src={logo} alt="logo" />
      </div>
    </section>
  );
};
