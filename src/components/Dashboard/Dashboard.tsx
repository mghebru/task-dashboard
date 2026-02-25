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
                className="border rounded-md p-2 m-3 flex items-center gap-2"
                onClick={() =>
                    setTheme(prev => (prev === "light" ? "dark" : "light"))
                }
            >
                {theme === "light" ? (
                    // Moon icon
                    <svg className="w-[21px] h-[21px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clip-rule="evenodd" />
                    </svg>

                ) : (
                    // Sun icon
                    <svg className="w-[21px] h-[21px] text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                    </svg>

                )}

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