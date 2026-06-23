import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../constants/colors";

export function AppBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 56,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.outlineVariant,
      }}
    >
      <MaterialIcons name="task-alt" size={24} color={colors.primary} />
      <Text style={{ fontSize: 20, fontWeight: "700", color: colors.primary }}>
        PRITECH Tasks
      </Text>
    </View>
  );
}
