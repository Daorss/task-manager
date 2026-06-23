import { ReactElement } from "react";
import { FlatList } from "react-native";
import Animated, { Keyframe, LinearTransition } from "react-native-reanimated";
import { colors } from "../../constants/colors";
import { cardShadow } from "../../constants/theme";
import { Task } from "../../types/task";
import { EmptyState } from "../common/EmptyState";
import { TaskCard } from "./TaskCard";

// Enter: rise + fade in. The card's depth comes from `boxShadow` (not Android
// `elevation`), so the shadow fades together with the card and there's no gray
// shadow box while it's translucent.
const fadeInUp = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: 12 }] },
  100: { opacity: 1, transform: [{ translateY: 0 }] },
});

// Exit: fade out early, then keep sliding right.
const slideOutRight = new Keyframe({
  0: { opacity: 1, transform: [{ translateX: 0 }] },
  50: { opacity: 0, transform: [{ translateX: 40 }] },
  100: { opacity: 0, transform: [{ translateX: 120 }] },
});

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
          entering={fadeInUp.duration(250)}
          exiting={slideOutRight.duration(300)}
          layout={LinearTransition}
          style={{
            marginBottom: 12,
            borderRadius: 16,
            backgroundColor: colors.cardBg,
            ...cardShadow,
          }}
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
