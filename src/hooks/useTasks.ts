import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

// Screens call this to read tasks and run actions. Throws if used outside the
// provider so the mistake is obvious during development.
export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return ctx;
}
