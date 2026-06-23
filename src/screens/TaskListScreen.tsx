import { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../constants/colors";
import { AppBar } from "../components/layout/AppBar";
import { Fab } from "../components/layout/Fab";
import { Layout } from "../components/layout/Layout";
import { SearchBar } from "../components/tasks/SearchBar";
import { FilterChips, TaskFilter } from "../components/tasks/FilterChips";
import { ProgressCard } from "../components/tasks/ProgressCard";
import { QuoteCard } from "../components/tasks/QuoteCard";
import { TaskList } from "../components/tasks/TaskList";
import { useTasks } from "../hooks/useTasks";
import { RootStackScreenProps } from "../navigation/types";

// Everything above the task cards: page title, search, filters, tip card.
function ListHeader({
  total,
  completed,
  search,
  onSearch,
  filter,
  onFilter,
  showQuote,
  onDismissQuote,
}: {
  total: number;
  completed: number;
  search: string;
  onSearch: (text: string) => void;
  filter: TaskFilter;
  onFilter: (filter: TaskFilter) => void;
  showQuote: boolean;
  onDismissQuote: () => void;
}) {
  return (
    <View style={{ paddingTop: 16 }}>
      {total > 0 && (
        <View style={{ marginBottom: 16 }}>
          <ProgressCard total={total} completed={completed} />
        </View>
      )}

      <View style={{ marginBottom: 16 }}>
        <SearchBar value={search} onChangeText={onSearch} />
      </View>

      <View style={{ marginBottom: 24 }}>
        <FilterChips selected={filter} onSelect={onFilter} />
      </View>

      {/* Live motivational quote from a public API */}
      {showQuote && (
        <View style={{ marginBottom: 24 }}>
          <QuoteCard onDismiss={onDismissQuote} />
        </View>
      )}
    </View>
  );
}

// Home screen: the task list with its header and the add-task FAB.
export function TaskListScreen({
  navigation,
}: RootStackScreenProps<"TaskList">) {
  const { tasks, loading, toggleTask, deleteTask } = useTasks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [showQuote, setShowQuote] = useState(true);

  const completedCount = tasks.filter((t) => t.completed).length;

  // Apply the status filter, then the search query.
  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks
      .filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter((t) => {
        if (!query) return true;
        return (
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
        );
      });
  }, [tasks, filter, search]);

  return (
    <Layout>
      <AppBar />

      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TaskList
            tasks={visibleTasks}
            header={
              <ListHeader
                total={tasks.length}
                completed={completedCount}
                search={search}
                onSearch={setSearch}
                filter={filter}
                onFilter={setFilter}
                showQuote={showQuote}
                onDismissQuote={() => setShowQuote(false)}
              />
            }
            onTaskPress={(task) =>
              navigation.navigate("TaskDetails", { id: task.id })
            }
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onCreateTask={() => navigation.navigate("AddTask")}
          />
          <Fab onPress={() => navigation.navigate("AddTask")} />
        </View>
      )}
    </Layout>
  );
}
