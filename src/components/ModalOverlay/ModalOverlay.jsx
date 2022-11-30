import React from "react";
import styles from "./ModalOverlay.module.css";

export const ModalOverlay = ({ active, children, onClick }) => {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
