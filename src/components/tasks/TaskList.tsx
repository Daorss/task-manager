import { ReactElement } from "react";
import { FlatList, View } from "react-native";
import { Task } from "../../types/task";
import { EmptyState } from "../common/EmptyState";
import { TaskCard } from "./TaskCard";

// The scrollable list of task cards. The screen's header content (title,
// search, filters, tip) is passed in as `header` so this stays the single
// scroller for the page. Shows an empty state when there are no tasks.
export function TaskList({
  tasks,
  header,
  onTaskPress,
  onToggleTask,
  onDeleteTask,
  onCreateTask,
}: {
  tasks: Task[];
  header?: ReactElement;
  onTaskPress?: (task: Task) => void;
  onToggleTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  onCreateTask?: () => void;
}) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onPress={() => onTaskPress?.(item)}
          onToggle={() => onToggleTask?.(item.id)}
          onDelete={() => onDeleteTask?.(item.id)}
        />
      )}
      ListHeaderComponent={header}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={<EmptyState onCreate={onCreateTask} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
