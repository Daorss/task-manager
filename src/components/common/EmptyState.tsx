import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { colors } from "../../constants/colors";

// Shown when the task list is empty — nudges the user to add their first task.
export function EmptyState({
  title = "No tasks yet.",
  subtitle = "Add your first task.",
  onCreate,
}: {
  title?: string;
  subtitle?: string;
  onCreate?: () => void;
}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500)}
      style={{ alignItems: "center", paddingVertical: 64, gap: 8 }}
    >
      {/* Illustration */}
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 24,
          marginBottom: 16,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.surfaceContainer,
        }}
      >
        <MaterialIcons name="checklist" size={56} color={colors.outline} />
      </View>

      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.primary }}>
        {title}
      </Text>
      <Text style={{ fontSize: 16, color: colors.onSurfaceVariant }}>
        {subtitle}
      </Text>

      {onCreate && (
        <Pressable
          onPress={onCreate}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 999,
            backgroundColor: colors.primary,
          }}
        >
          <MaterialIcons name="add" size={20} color={colors.white} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.white }}>
            Create Task
          </Text>
        </Pressable>
      )}
    </Animated.View>
  );
}
