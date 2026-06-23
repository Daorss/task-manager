import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { colors } from "../constants/colors";
import { Layout } from "../components/layout/Layout";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { RootStackScreenProps } from "../navigation/types";

export function AddTaskScreen({ navigation }: RootStackScreenProps<"AddTask">) {
  const goBack = () => navigation.goBack();

  return (
    <Layout>
      <ScreenHeader title="Add New Task" onBack={goBack} />

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text
            style={{ fontSize: 30, fontWeight: "700", color: colors.primary }}
          >
            New Journey
          </Text>
          <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
            Define your next milestone.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: colors.onSurfaceVariant,
            }}
          >
            Task Title
          </Text>
          <TextInput
            placeholder="Enter title"
            placeholderTextColor={colors.outlineVariant}
            style={{
              height: 48,
              paddingHorizontal: 16,
              fontSize: 16,
              backgroundColor: colors.cardBg,
              borderWidth: 1,
              borderColor: colors.outlineVariant,
              borderRadius: 8,
              color: colors.onSurface,
            }}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: colors.onSurfaceVariant,
            }}
          >
            Description
          </Text>
          <TextInput
            placeholder="Enter details"
            placeholderTextColor={colors.outlineVariant}
            multiline
            numberOfLines={4}
            style={{
              minHeight: 112,
              padding: 16,
              fontSize: 14,
              backgroundColor: colors.cardBg,
              borderWidth: 1,
              borderColor: colors.outlineVariant,
              borderRadius: 8,
              color: colors.onSurface,
              textAlignVertical: "top",
            }}
          />
        </View>

        <View style={{ gap: 12, paddingTop: 16 }}>
          <Pressable
            onPress={goBack}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 56,
              borderRadius: 12,
              backgroundColor: colors.primary,
            }}
          >
            <MaterialIcons name="add-task" size={20} color={colors.white} />
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.white }}
            >
              Create Task
            </Text>
          </Pressable>

          <Pressable
            onPress={goBack}
            style={{
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.outlineVariant,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: colors.secondary,
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Layout>
  );
}
