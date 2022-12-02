import React, { useState } from "react";
import styles from "./Modal.module.css";
import cross from "../../images/cross.svg";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction } from "../../services/reducers/modal";

export const Modal = () => {
  const [inputActive, setInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const active = useSelector((state) => state.modal.active);
  const dispatch = useDispatch();
  const addDescription = () => {
    setInputActive(true);
  };
  const goBack = () => {
    setInputActive(false);
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <div className={styles.modal__statuts}>
            <div className={styles.modal__block}>
              <div className={styles.modal__title}>
                <p>#2 - </p>
                <p>Titleeeeeeee</p>
              </div>
              <p className={styles.modal__date}>Created at: Dateeee</p>
              <p className={styles.modal__date}>Time in progress: Dateeee</p>
              <p className={styles.modal__date}>End at: Dateeee</p>
            </div>
            <div className={styles.modal__status}>
              <p>Status: </p>
              <p>Priority: </p>
            </div>
          </div>
          <img
            src={cross}
            alt="cross"
            className={styles.modal__cross}
            onClick={closeModal}
          />
          <button className={styles.modal__closeTaskButton}>Close the task</button>
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
                  <button className={styles.modal__cancel} onClick={goBack}>
                    Cancel
                  </button>
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
