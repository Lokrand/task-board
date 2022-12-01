import React, { useState } from "react";
import styles from "./Modal.module.css";
import cross from "../../images/cross.svg";
import { useCallback, useEffect } from "react";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction, openModal } from "../../services/reducers/modal";

export const Modal = () => {
  const [inputActive, setInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const active = useSelector((state) => state.modal.active)
  const dispatch = useDispatch()
  const addDescription = () => {
    setInputActive(true);
  };
  const goBack = () => {
    setInputActive(false)
  }
  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const closeModal = () => {
    dispatch(closeModalAction())
  }

  return ReactDom.createPortal(
    // {active ? }
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <div className={styles.modal__title}>
            <p>#2 - </p>
            <p>Titleeeeeeee</p>
          </div>
          <p className={styles.modal__date}>Created at: Dateeee</p>
          <img src={cross} alt="" className={styles.modal__cross} onClick={closeModal} />
        </div>
        <div className={styles.modal__description}>
          <p className={styles.modal__descriptionTitle}>Description:</p>
          <div className={styles.modal__addDescriptionBlock}>
            {inputActive && (
              <>
                <textarea
                  className={styles.modal__input}
                  rows="10"
                  placeholder="Enter the description"
                  id="textName"
                  onChange={onChangeInput}
                ></textarea>
                <div className={styles.modal__buttons}>
                  <button className={styles.modal__confirm}>Confirm</button>
                  <button className={styles.modal__cancel} onClick={goBack}>Cancel</button>
                </div>
              </>
            )}
            {!inputActive && (
              <button
                className={styles.modal__descriptionButton}
                onClick={addDescription}
              >
                Add description
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};
