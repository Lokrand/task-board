import React, { FC } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
  active: boolean;
  onClick: VoidFunction;
  children: React.ReactNode;
}

export const ModalOverlay: FC<IModalOverlay> = ({ active, children, onClick }) => {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
