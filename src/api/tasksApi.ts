import { Task } from "../types/task";
import { formatDate } from "../utils/date";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

// The shape JSONPlaceholder returns for each todo.
type ApiTodo = {
  id: number;
  title: string;
  completed: boolean;
};

// Fetch a few todos from the public API and map them into our Task model.
// The API has no description/date, so we synthesize those.
export async function fetchSeedTasks(limit = 5): Promise<Task[]> {
  const res = await fetch(`${TODOS_URL}?_limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks: ${res.status}`);
  }
  const todos: ApiTodo[] = await res.json();
  const today = formatDate(new Date());

  return todos.map((todo) => ({
    id: `seed-${todo.id}`,
    title: todo.title,
    description: "Imported from JSONPlaceholder.",
    date: today,
    completed: todo.completed,
  }));
}
