import { useState } from "react";
import type { Task, TaskFormData } from "../../types";

interface TaskFormProps {
    onAddTask: (task: Task) => void;
}

//functional component declaration with destructured props
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    //form state
    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        priority: "medium",
    });

    //error state            //partial menas all fields are optional
    const [errors, setErrors] = useState<Partial<TaskFormData>>({});

    //validation that returns true or false
    const validate = (): boolean => {
        //create empty error obj
        const newErrors: Partial<TaskFormData> = {};
        //title cannot be empty
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        //true if no errors, false if exist
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //handles input and select changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        //target name and value for changes
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    //handle submit
    const handleSubmit = (e: React.ChangeEvent) => {
        //stop page reload
        e.preventDefault();
        if (!validate()) return;

        //create new task
        const newTask: Task = {
            id: Date.now().toString(),
            ...formData,
            status: "pending",
        };

        onAddTask(newTask);

        //reset form
        setFormData({
            title: "",
            description: "",
            priority: "medium",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 m-2 rounded-md flex justify-center gap-4"> 
            <input className="border rounded-lg p-3 m-1 w-[100%]"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
            />
            
            {errors.title && <p>{errors.title}</p>}

            <select className="rounded-lg p-1 shadow-xl text-sm dark:bg-white dark:text-black"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                
                <option value="low" className="dark:bg-black dark:text-white">Low</option>
                <option value="medium" className="dark:bg-black dark:text-white">Medium</option>
                <option value="high" className="dark:bg-black dark:text-white">High</option>
            </select>

            <button type="submit" className="rounded-lg p-5 shadow-xl text-sm dark:border border-white">Add Task</button>
        </form>
    );
};

export default TaskForm;