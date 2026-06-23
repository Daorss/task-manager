import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Task } from "../types/task";
import { AppBar } from "../components/layout/AppBar";
import { Fab } from "../components/layout/Fab";
import { Layout } from "../components/layout/Layout";
import { SearchBar } from "../components/tasks/SearchBar";
import { FilterChips } from "../components/tasks/FilterChips";
import { TaskList } from "../components/tasks/TaskList";
import { RootStackScreenProps } from "../navigation/types";

// Placeholder data so the layout is visible. Replaced with real state/API later.
const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Review Code",
    description: "Check the new PR for the dashboard component.",
    date: "Oct 24, 2023",
    completed: false,
  },
  {
    id: "2",
    title: "Weekly Grocery",
    description: "Buy milk, eggs, and bread from the store.",
    date: "Oct 23, 2023",
    completed: true,
  },
  {
    id: "3",
    title: "Client Meeting",
    description: "Discuss project timeline and milestones.",
    date: "Oct 25, 2023",
    completed: false,
  },
];

// Everything above the task cards: page title, search, filters, tip card.
function ListHeader() {
  return (
    <View>
      <View style={{ marginTop: 24, marginBottom: 16 }}>
        <Text style={{ fontSize: 30, fontWeight: "700", color: colors.primary }}>
          PRITECH Tasks
        </Text>
        <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
          Manage your daily tasks
        </Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <SearchBar />
      </View>

      <View style={{ marginBottom: 24 }}>
        <FilterChips />
      </View>

      {/* Productivity tip card */}
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
        <View style={{ flex: 1 }}>
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
      </View>
    </View>
  );
}

// Home screen: the task list with its header and the add-task FAB.
export function TaskListScreen({
  navigation,
}: RootStackScreenProps<"TaskList">) {
  return (
    <Layout>
      <AppBar />
      <View style={{ flex: 1 }}>
        <TaskList
          tasks={SAMPLE_TASKS}
          header={<ListHeader />}
          onTaskPress={(task) => navigation.navigate("TaskDetails", { task })}
        />
        <Fab onPress={() => navigation.navigate("AddTask")} />
      </View>
    </Layout>
  );
}
