import type { Task } from "../../types";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onToggle,
}) => {
  return (
    <li>
      <span
        style={{
          textDecoration:
            task.status === "completed" ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>
      <br></br>

      <button onClick={() => onToggle(task.id)}>Complete</button>
     <br></br>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
