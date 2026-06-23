import { Pressable, Text, View } from "react-native";
import { colors } from "../../constants/colors";

export type TaskFilter = "all" | "active" | "completed";

const FILTERS: { label: string; value: TaskFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

// All / Active / Completed chip row. Controlled by the screen.
export function FilterChips({
  selected,
  onSelect,
}: {
  selected: TaskFilter;
  onSelect: (filter: TaskFilter) => void;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {FILTERS.map(({ label, value }) => {
        const active = value === selected;
        return (
          <Pressable
            key={value}
            onPress={() => onSelect(value)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: active
                ? colors.primaryContainer
                : colors.surfaceContainer,
              borderWidth: active ? 0 : 1,
              borderColor: colors.outlineVariant,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: active
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
