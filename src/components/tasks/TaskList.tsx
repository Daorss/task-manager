import { ReactElement } from "react";
import { FlatList } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
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
        <Animated.View
          entering={FadeInDown.duration(250)}
          exiting={FadeOutRight.duration(200)}
          layout={LinearTransition}
          style={{ marginBottom: 12 }}
        >
          <TaskCard
            task={item}
            onPress={() => onTaskPress?.(item)}
            onToggle={() => onToggleTask?.(item.id)}
            onDelete={() => onDeleteTask?.(item.id)}
          />
        </Animated.View>
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyState onCreate={onCreateTask} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
