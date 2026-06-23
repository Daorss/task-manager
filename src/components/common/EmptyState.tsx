import { Text, View } from "react-native";
import { colors } from "../../constants/colors";

export function EmptyState({
  message = "No tasks found.",
}: {
  message?: string;
}) {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Text style={{ color: colors.outline }}>{message}</Text>
    </View>
  );
}
