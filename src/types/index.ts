export type TaskStatus = "pending" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
}

export interface TaskFilterOptions {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  search: string;
}