import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

// One key holds the whole task list as a JSON string.
const STORAGE_KEY = "tasks";

// Read the saved tasks. Returns [] on first launch or if anything goes wrong.
export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch (e) {
    console.warn("Failed to load tasks", e);
    return [];
  }
}

// Persist the whole task list.
export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("Failed to save tasks", e);
  }
}
