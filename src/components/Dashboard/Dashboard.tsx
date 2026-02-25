import { useEffect, useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import TaskFilter from "../TaskFilter/TaskFilter";
import type { Task, TaskFilterOptions } from "../../types";
import { filterTasks } from "../../Utils/taskUtils";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: "all",
    priority: "all",
    search: "",
  });

  //persist theme
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  //apply theme to <html> and save
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load tasks
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored) as Task[]);
    }
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  const filteredTasks = filterTasks(tasks, filters);

  return (
    <div>
      <button
        onClick={() =>
          setTheme(prev => (prev === "light" ? "dark" : "light"))
        }
      >
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>

      <TaskForm onAddTask={addTask} />
      <TaskFilter filters={filters} setFilters={setFilters} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleStatus}
      />
    </div>
  );
};

export default Dashboard;
