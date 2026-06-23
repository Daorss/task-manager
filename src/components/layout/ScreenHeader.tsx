import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../constants/colors";

// Top bar for secondary screens: a back button + the screen title.
export function ScreenHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        height: 56,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.outlineVariant,
      }}
    >
      <Pressable
        onPress={onBack}
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
      </Pressable>
      <Text style={{ fontSize: 20, fontWeight: "600", color: colors.primary }}>
        {title}
      </Text>
    </View>
  );
}
