import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { Task } from "../../types/task";
import { Badge } from "../common/Badge";

// A single task row: checkbox, title, status badge, description, date, delete.
// Tapping the card opens its details; the checkbox/delete handlers come later.
export function TaskCard({
  task,
  onPress,
  onToggle,
  onDelete,
}: {
  task: Task;
  onPress?: () => void;
  onToggle?: () => void;
  onDelete?: () => void;
}) {
  const done = task.completed;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: colors.cardBg,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        borderRadius: 12,
        padding: 16,
        opacity: done ? 0.8 : 1,
      }}
    >
      {/* Checkbox */}
      <Pressable
        onPress={onToggle}
        hitSlop={8}
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: done ? colors.primary : colors.outline,
          backgroundColor: done ? colors.primary : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {done && <MaterialIcons name="check" size={16} color={colors.white} />}
      </Pressable>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "600",
              color: colors.onSurface,
              textDecorationLine: done ? "line-through" : "none",
            }}
          >
            {task.title}
          </Text>
          <Badge completed={done} />
        </View>

        <Text
          style={{
            fontSize: 14,
            color: colors.onSurfaceVariant,
            marginTop: 2,
            marginBottom: 6,
            textDecorationLine: done ? "line-through" : "none",
          }}
        >
          {task.description}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialIcons name="calendar-today" size={13} color={colors.outline} />
          <Text style={{ fontSize: 11, color: colors.outline }}>{task.date}</Text>
        </View>
      </View>

      {/* Delete */}
      <Pressable onPress={onDelete} hitSlop={8} style={{ padding: 8 }}>
        <MaterialIcons name="delete" size={22} color={colors.outline} />
      </Pressable>
    </Pressable>
  );
}
