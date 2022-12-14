import React, {
  FC,
  ForwardRefExoticComponent,
  JSXElementConstructor,
  ReactElement,
  RefAttributes,
  RefObject,
} from "react";
import { ConnectDropTarget } from "react-dnd";
import { ITask } from "../../services/types/data";
import { Task } from "../Task/Task";
import styles from "./TaskColumn.module.css";

interface ITaskColumn {
  ref: HTMLDivElement;
  title: string;
  tasks: ITask[];
  children?: React.ReactNode;
  footer?: any;
}

export const TaskColumn: ForwardRefExoticComponent<
  Pick<ITaskColumn, "title" | "tasks" | "children" | "footer"> &
    RefAttributes<HTMLDivElement>
> = React.forwardRef((props, ref) => {
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
