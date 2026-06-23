import { Text, TextInput, View } from "react-native";
import { colors } from "../constants/colors";

// Form to create a new task. Validation + saving wired up later.
export function AddTaskScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.primary }}>
        New Task
      </Text>

      {/* Title field */}
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: colors.onSurface }}>
          Title
        </Text>
        <TextInput
          placeholder="What needs doing?"
          placeholderTextColor={colors.outline}
          style={{
            height: 48,
            paddingHorizontal: 16,
            backgroundColor: colors.cardBg,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
            borderRadius: 12,
            color: colors.onSurface,
          }}
        />
      </View>

      {/* Description field */}
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: colors.onSurface }}>
          Description
        </Text>
        <TextInput
          placeholder="Add more detail..."
          placeholderTextColor={colors.outline}
          multiline
          style={{
            minHeight: 96,
            padding: 16,
            backgroundColor: colors.cardBg,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
            borderRadius: 12,
            color: colors.onSurface,
            textAlignVertical: "top",
          }}
        />
      </View>
    </View>
  );
}
