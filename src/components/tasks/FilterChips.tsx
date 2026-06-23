import { Pressable, Text, View } from "react-native";
import { colors } from "../../constants/colors";

const FILTERS = ["All", "Active", "Completed"];

// All / Active / Completed chip row. Selection logic comes later;
// "All" is shown as selected for now to preview the layout.
export function FilterChips() {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {FILTERS.map((label) => {
        const selected = label === "All";
        return (
          <Pressable
            key={label}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: selected
                ? colors.primaryContainer
                : colors.surfaceContainer,
              borderWidth: selected ? 0 : 1,
              borderColor: colors.outlineVariant,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: selected
                  ? colors.onPrimaryContainer
                  : colors.onSurfaceVariant,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
