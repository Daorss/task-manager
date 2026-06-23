import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../types/task";
import { fetchSeedTasks } from "../api/tasksApi";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import { formatDate } from "../utils/date";

// What every screen can read/do with tasks.
export type TasksContextValue = {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined,
);

// Holds the single source of truth for tasks and keeps it mirrored to storage.
export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // On startup: use saved tasks if we have any, otherwise (very first launch)
  // seed the list from the public API.
  useEffect(() => {
    (async () => {
      try {
        const stored = await loadTasks();
        if (stored !== null) {
          setTasks(stored);
        } else {
          setTasks(await fetchSeedTasks());
        }
      } catch (e) {
        console.warn("Failed to initialise tasks", e);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Save whenever tasks change (but not during the initial load).
  useEffect(() => {
    if (!loading) saveTasks(tasks);
  }, [tasks, loading]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      date: formatDate(new Date()),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, loading, addTask, toggleTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
