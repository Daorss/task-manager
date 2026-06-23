import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { colors } from "../constants/colors";
import { Layout } from "../components/layout/Layout";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { useTasks } from "../hooks/useTasks";
import { RootStackScreenProps } from "../navigation/types";

// Form to create a new task: title (required) + description, then save.
export function AddTaskScreen({ navigation }: RootStackScreenProps<"AddTask">) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const goBack = () => navigation.goBack();

  const onCreate = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    addTask(title, description);
    navigation.goBack();
  };

  return (
    <Layout>
      <ScreenHeader title="Add New Task" onBack={goBack} />

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro */}
        <View>
          <Text style={{ fontSize: 30, fontWeight: "700", color: colors.primary }}>
            New Journey
          </Text>
          <Text style={{ fontSize: 14, color: colors.onSurfaceVariant }}>
            Define your next milestone.
          </Text>
        </View>

        {/* Title field */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.onSurfaceVariant }}>
            Task Title
          </Text>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError("");
            }}
            placeholder="Enter title"
            placeholderTextColor={colors.outlineVariant}
            style={{
              height: 48,
              paddingHorizontal: 16,
              fontSize: 16,
              backgroundColor: colors.cardBg,
              borderWidth: 1,
              borderColor: error ? colors.error : colors.outlineVariant,
              borderRadius: 8,
              color: colors.onSurface,
            }}
          />
          {error ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <MaterialIcons name="error" size={14} color={colors.error} />
              <Text style={{ fontSize: 11, color: colors.error }}>{error}</Text>
            </View>
          ) : null}
        </View>

        {/* Description field */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.onSurfaceVariant }}>
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
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

        {/* Actions */}
        <View style={{ gap: 12, paddingTop: 16 }}>
          <Pressable
            onPress={onCreate}
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
            <Text style={{ fontSize: 16, fontWeight: "700", color: colors.white }}>
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
