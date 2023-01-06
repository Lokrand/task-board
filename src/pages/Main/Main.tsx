import React, { FC } from "react";
import { Boards } from "../../components/Boards/Boards";
import styles from "./Main.module.css";

export const Main: FC = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.main__title}>My boards</h2>
      <Boards />
    </section>
  );
};
