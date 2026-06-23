import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

// One key holds the whole task list as a JSON string.
const STORAGE_KEY = "tasks";

// Read the saved tasks. Returns null when nothing has ever been saved (so the
// caller knows it's a first launch and can seed), or the saved array otherwise.
export async function loadTasks(): Promise<Task[] | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : null;
  } catch (e) {
    console.warn("Failed to load tasks", e);
    return null;
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
