import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../constants/colors";
import { cardShadow } from "../../constants/theme";

// "Hero" summary card: how many tasks are done, with an animated progress bar.
export function ProgressCard({
  total,
  completed,
}: {
  total: number;
  completed: number;
}) {
  const percent = total ? Math.round((completed / total) * 100) : 0;

  // Animate the bar filling up whenever the percentage changes.
  const fill = useSharedValue(0);
  useEffect(() => {
    fill.value = withTiming(percent, { duration: 500 });
  }, [percent]);
  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value}%` }));

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 16,
        backgroundColor: colors.cardBg,
        gap: 16,
        ...cardShadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSurface,
            }}
          >
            <MaterialIcons name="insights" size={22} color={colors.accent} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: colors.onSurfaceVariant,
              }}
            >
              Your Progress
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.primary }}
            >
              {completed} of {total} done
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 24, fontWeight: "800", color: colors.accent }}>
          {percent}%
        </Text>
      </View>

      {/* Progress bar */}
      <View
        style={{
          height: 8,
          borderRadius: 999,
          backgroundColor: colors.surfaceContainerHighest,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            { height: "100%", borderRadius: 999, backgroundColor: colors.accent },
            fillStyle,
          ]}
        />
      </View>
    </View>
  );
}
