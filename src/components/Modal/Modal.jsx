import React from "react";
import styles from "./Modal.module.css";
import cross from "../../images/cross.svg"
import { useCallback, useEffect } from "react";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../services/reducers/modal";


export const Modal = ({ active, children, onClose }) => {
  const dispatch = useDispatch();
  const closePopup = useCallback(() => {
    dispatch(openModal(""));
    onClose?.();
  }, [onClose]);

  const isOpen = active;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen, closePopup]);

  return ReactDom.createPortal(
    <ModalOverlay active={active} onClick={closePopup}>
      <div
        className={
          active ? `${styles.content} ${styles.active}` : styles.content
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.closeIcon} onClick={closePopup}>
          <img src={cross} alt="cross" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modals")
  );
}