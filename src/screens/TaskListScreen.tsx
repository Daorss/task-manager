import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { AppBar } from "../components/layout/AppBar";
import { Fab } from "../components/layout/Fab";
import { Layout } from "../components/layout/Layout";
import { SearchBar } from "../components/tasks/SearchBar";
import { FilterChips, TaskFilter } from "../components/tasks/FilterChips";
import { TaskList } from "../components/tasks/TaskList";
import { useTasks } from "../hooks/useTasks";
import { RootStackScreenProps } from "../navigation/types";

// Everything above the task cards: page title, search, filters, tip card.
function ListHeader({
  search,
  onSearch,
  filter,
  onFilter,
  showTip,
  onDismissTip,
}: {
  search: string;
  onSearch: (text: string) => void;
  filter: TaskFilter;
  onFilter: (filter: TaskFilter) => void;
  showTip: boolean;
  onDismissTip: () => void;
}) {
  return (
    <View>
      <View style={{ marginTop: 24, marginBottom: 16 }}>
        <Text
          style={{ fontSize: 30, fontWeight: "700", color: colors.primary }}
        >
          PRITECH Tasks
        </Text>
        <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
          Manage your daily tasks
        </Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <SearchBar value={search} onChangeText={onSearch} />
      </View>

      <View style={{ marginBottom: 24 }}>
        <FilterChips selected={filter} onSelect={onFilter} />
      </View>

      {/* Productivity tip card */}
      {showTip && (
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "flex-start",
            padding: 16,
            marginBottom: 24,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(20,112,232,0.2)",
            backgroundColor: "rgba(20,112,232,0.1)",
          }}
        >
          <MaterialIcons name="lightbulb" size={24} color={colors.secondary} />
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: colors.secondary,
                marginBottom: 4,
              }}
            >
              Productivity Tip
            </Text>
            <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
              Break big tasks into smaller steps.
            </Text>
          </View>

          {/* Dismiss button — top-right corner */}
          <Pressable
            onPress={onDismissTip}
            hitSlop={8}
            style={{ position: "absolute", top: 8, right: 8, padding: 4 }}
          >
            <MaterialIcons name="close" size={18} color={colors.onSurfaceVariant} />
          </Pressable>
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
  const [showTip, setShowTip] = useState(true);

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
                search={search}
                onSearch={setSearch}
                filter={filter}
                onFilter={setFilter}
                showTip={showTip}
                onDismissTip={() => setShowTip(false)}
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
