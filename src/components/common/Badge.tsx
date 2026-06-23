import { Text, View } from "react-native";
import { colors } from "../../constants/colors";

export function Badge({ completed }: { completed: boolean }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: completed
          ? colors.surfaceContainerHighest
          : colors.activeBadgeBg,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: "700",
          textTransform: "uppercase",
          color: completed ? colors.onSurfaceVariant : colors.activeBadgeText,
        }}
      >
        {completed ? "Completed" : "Active"}
      </Text>
    </View>
  );
}
