import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { colors } from "../../constants/colors";

export function Fab({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 24,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 999,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <MaterialIcons name="add" size={28} color={colors.white} />
    </Pressable>
  );
}
