import { useEffect, useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import TaskFilter from "../TaskFilter/TaskFilter";
import type { Task, TaskFilterOptions } from "../../types";
import { filterTasks } from "../../Utils/taskUtils";

//declare react functional component
const Dashboard: React.FC = () => {
    //task state that runs once on render
    const [tasks, setTasks] = useState<Task[]>(() => {
        //check local storage if task exists and load, if not empty array
        const stored = localStorage.getItem("tasks");
        return stored ? (JSON.parse(stored) as Task[]) : [];
    });

    //save task to local storage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //runs when tasks updates
    }, [tasks]);

    //filter state
    const [filters, setFilters] = useState<TaskFilterOptions>({
        status: "all",
        priority: "all",
        search: "",
    });

    //persistent theme state
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark" ? "dark" : "light";
    });

    //apply theme to html and save
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    // add tasks
    const addTask = (task: Task) => {
        //spread operator to take new task and add new task
        setTasks(prev => [...prev, task]);
    };

    //delete tasks
    const deleteTask = (id: string) => {
        //filter array and keep matching id, return new array
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    //toggle status
    const toggleStatus = (id: string) => {
        setTasks(prev =>
            //loop through tasks 
            prev.map(task =>
                task.id === id
                    ? {
                        //if id matches, copy task and change status
                        ...task,
                        status:
                            task.status === "pending" ? "completed" : "pending",
                    }
                    : task
            )
        );
    };

    //return filtered array when rendering
    const filteredTasks = filterTasks(tasks, filters);

    return (
        <div>
            {/* theme button */}
            <button
                onClick={() =>
                    setTheme(prev => (prev === "light" ? "dark" : "light"))}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

            {/* render components */}
            <TaskForm onAddTask={addTask} />
            {/* pass state and setters to child */}
            <TaskFilter filters={filters} setFilters={setFilters} />
            <TaskList
                // pass filtered tasks, delete and theme toggle
                tasks={filteredTasks}
                onDelete={deleteTask}
                onToggle={toggleStatus}
            />
        </div>
    );
};

export default Dashboard;
