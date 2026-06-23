import { MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Layout } from "../components/layout/Layout";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { useTasks } from "../hooks/useTasks";
import { RootStackScreenProps } from "../navigation/types";

// Read-only details for a single task, looked up live from the store by id.
export function TaskDetailsScreen({
  navigation,
  route,
}: RootStackScreenProps<"TaskDetails">) {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const task = tasks.find((t) => t.id === route.params.id);

  // The task may be gone (e.g. just deleted) while the screen animates out.
  if (!task) {
    return (
      <Layout>
        <ScreenHeader title="Task Details" onBack={() => navigation.goBack()} />
      </Layout>
    );
  }

  const done = task.completed;

  const onDelete = () =>
    Alert.alert("Delete task", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);

  return (
    <Layout>
      <ScreenHeader title="Task Details" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
        {/* Title + created date */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              lineHeight: 34,
              color: colors.onSurface,
            }}
          >
            {task.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color={colors.onSurfaceVariant}
            />
            <Text style={{ fontSize: 11, color: colors.onSurfaceVariant }}>
              Created on {task.date}
            </Text>
          </View>
        </View>

        {/* Status card */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            padding: 16,
            borderRadius: 12,
            backgroundColor: colors.cardBg,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: done
                ? colors.secondaryContainer
                : colors.surfaceContainerHighest,
            }}
          >
            <MaterialIcons
              name={done ? "check-circle" : "radio-button-unchecked"}
              size={22}
              color={done ? colors.white : colors.onSurfaceVariant}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: colors.onSurfaceVariant,
              }}
            >
              Current Status
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "600", color: colors.onSurface }}
            >
              {done ? "Completed" : "Active"}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: colors.onSurfaceVariant,
            }}
          >
            Description
          </Text>
          <View
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: colors.cardBg,
              borderWidth: 1,
              borderColor: colors.outlineVariant,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color: colors.onSurfaceVariant,
              }}
            >
              {task.description || "No description."}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View
          style={{
            gap: 12,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: colors.outlineVariant,
          }}
        >
          <Pressable
            onPress={() => toggleTask(task.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 52,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.secondary,
            }}
          >
            <MaterialIcons
              name={done ? "undo" : "check"}
              size={20}
              color={colors.secondary}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.secondary }}
            >
              {done ? "Mark as Not Completed" : "Mark as Completed"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 52,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.error,
            }}
          >
            <MaterialIcons name="delete" size={20} color={colors.error} />
            <Text style={{ fontSize: 16, fontWeight: "700", color: colors.error }}>
              Delete Task
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Layout>
  );
}
