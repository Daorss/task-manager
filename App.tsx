import { Layout } from "./src/components/layout/Layout";
import { TaskListScreen } from "./src/screens/TaskListScreen";

// App entry point. For now it renders the task list inside the app shell.
// Navigation between screens (list -> add -> details) is added later.
export default function App() {
  return (
    <Layout>
      <TaskListScreen />
    </Layout>
  );
}
