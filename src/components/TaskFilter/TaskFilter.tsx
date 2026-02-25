import React from "react";
import type { TaskFilterOptions } from "../../types";

interface TaskFilterProps {
  filters: TaskFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilterOptions>>;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  setFilters,
}) => {
  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      status: e.target.value as TaskFilterOptions["status"],
    }));
  };

  const handlePriorityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      priority: e.target.value as TaskFilterOptions["priority"],
    }));
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value,
    }));
  };

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
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={handleStatusChange}
        className="border p-2 rounded"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={handlePriorityChange}
        className="border p-2 rounded"
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        Clear
      </button>
    </div>
  );
};

export default TaskFilter;