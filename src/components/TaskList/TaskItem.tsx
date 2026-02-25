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

      <button onClick={() => onToggle(task.id)}>Toggle</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;