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
    <li className="border-2 rounded-lg p-2 m-4 text-pink-600">
      <span className="text-xl "
        style={{
          textDecoration:
            task.status === "completed" ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>
      <br></br>

      <button className="m-2 border p-1 rounded-xl cursor-pointer hover:bg-pink-200" onClick={() => onToggle(task.id)}>Done</button>
      <button className="border p-1 rounded-xl cursor-pointer hover:bg-pink-200" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;