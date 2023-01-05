import React, { FC } from "react";
import { Task } from "../Task/Task";
import styles from "./TaskColumn.module.css";

interface ITaskColumn {
  
}

export const TaskColumn: FC = React.forwardRef((props, ref) => {

  const { title, tasks, children, footer } = props;
  
  return (
    <div className={styles.tasks__column} ref={ref}>
      <h3 className={styles.tasks__taskName}>{title}</h3>

      <div className={styles.tasks__items}>
        {tasks.map((el) => (
          <Task key={el.id} el={el} />
        ))}
        {children}
      </div>
      {footer}
    </div>
  );
});
