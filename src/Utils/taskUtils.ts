import type{ Task, TaskFilterOptions } from "../types";

export const filterTasks = (
  tasks: Task[],
  filters: TaskFilterOptions
  
): Task[] => {
  return tasks
    .filter(task =>
      filters.status === "all"
        ? true
        : task.status === filters.status
    )
    .filter(task =>
      filters.priority === "all"
        ? true
        : task.priority === filters.priority
    )
    .filter(task =>
      task.title
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    );
};