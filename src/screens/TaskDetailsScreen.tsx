import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Badge } from "../components/common/Badge";
import { Layout } from "../components/layout/Layout";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { RootStackScreenProps } from "../navigation/types";

// Read-only details view for a single task. The task is looked up by
// route.params.id once shared task state exists; static for now.
export function TaskDetailsScreen({
  navigation,
}: RootStackScreenProps<"TaskDetails">) {
  return (
    <Layout>
      <ScreenHeader title="Task Details" onBack={() => navigation.goBack()} />

      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text
            style={{
              flex: 1,
              fontSize: 24,
              fontWeight: "700",
              color: colors.primary,
            }}
          >
            Task title
          </Text>
          <Badge completed={false} />
        </View>

        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.outline }}>
            DESCRIPTION
          </Text>
          <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
            Task description goes here.
          </Text>
        </View>

        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.outline }}>
            CREATED
          </Text>
          <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
            Oct 24, 2023
          </Text>
        </View>
      </View>
    </Layout>
  );
}
