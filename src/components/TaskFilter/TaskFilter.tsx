import React from "react";
import type { TaskFilterOptions } from "../../types";

interface TaskFilterProps {
    filters: TaskFilterOptions;
    setFilters: React.Dispatch<React.SetStateAction<TaskFilterOptions>>;
}

//component declaration
const TaskFilter: React.FC<TaskFilterProps> = ({
    //detructuring props
    filters,
    setFilters,
}) => {
    //status change handler based on select event
    const handleStatusChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        //keeps prev filters and updates status
        setFilters(prev => ({
            ...prev,
            status: e.target.value as TaskFilterOptions["status"],
        }));
    };

    //priority filter based on select event
    const handlePriorityChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFilters(prev => ({
            ...prev,
            priority: e.target.value as TaskFilterOptions["priority"],
        }));
    };

    //search change based on input
    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilters(prev => ({
            ...prev,
            search: e.target.value,
        }));
    };

    //reset to default state
    const clearFilters = () => {
        setFilters({
            status: "all",
            priority: "all",
            search: "",
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={handleSearchChange}
                className="border p-2 rounded w-full md:w-1/3 p-2 m-1"
            />

            {/* Status Filter */}
            <select
                value={filters.status}
                onChange={handleStatusChange}
                className="border p-2 rounded"
            >
                <option value="all" className="dark:bg-black">All Status</option>
                <option value="pending" className="dark:bg-black">Pending</option>
                <option value="completed" className="dark:bg-black">Completed</option>
            </select>

            {/* Priority Filter */}
            <select
                value={filters.priority}
                onChange={handlePriorityChange}
                className="border p-2 rounded"
            >
                <option value="all" className="dark:bg-black">All Priority</option>
                <option value="low" className="dark:bg-black">Low</option>
                <option value="medium" className="dark:bg-black">Medium</option>
                <option value="high" className="dark:bg-black">High</option>
            </select>

            {/* Clear */}
            <button
                onClick={clearFilters}
                className="flex p-2 w-[25%] justify-center rounded-xl hover:bg-gray-300 bg-pink-600">
                Clear Filters
            </button>

        </div>
    );
};

export default TaskFilter;