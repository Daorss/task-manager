import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { colors } from "../../constants/colors";

// Search input row. Value/onChange wiring comes later.
export function SearchBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 48,
        paddingHorizontal: 16,
        backgroundColor: colors.cardBg,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        borderRadius: 999,
      }}
    >
      <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />
      <TextInput
        placeholder="Search tasks..."
        placeholderTextColor={colors.outline}
        style={{ flex: 1, fontSize: 14, color: colors.onSurface }}
      />
    </View>
  );
}
