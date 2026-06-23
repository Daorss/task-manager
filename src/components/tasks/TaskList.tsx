import { ReactElement } from "react";
import { FlatList } from "react-native";
import Animated, { Keyframe, LinearTransition } from "react-native-reanimated";
import { colors } from "../../constants/colors";
import { cardShadow } from "../../constants/theme";
import { Task } from "../../types/task";
import { EmptyState } from "../common/EmptyState";
import { TaskCard } from "./TaskCard";

// Enter: rise + fade in. Elevation stays at 0 while the card is translucent
// (Android draws an elevated view's shadow as a gray box unless its background
// is fully opaque), then ramps to the resting shadow once it's opaque.
const fadeInUp = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: 12 }], elevation: 0 },
  60: { opacity: 1, transform: [{ translateY: 0 }], elevation: 0 },
  100: { opacity: 1, transform: [{ translateY: 0 }], elevation: 2 },
});

// Exit: fade out early, then keep sliding right. Elevation is held at 0 the
// whole time so the leaving card fades cleanly instead of flashing a gray
// shadow box as its background turns translucent.
const slideOutRight = new Keyframe({
  0: { opacity: 1, transform: [{ translateX: 0 }], elevation: 0 },
  50: { opacity: 0, transform: [{ translateX: 40 }], elevation: 0 },
  100: { opacity: 0, transform: [{ translateX: 120 }], elevation: 0 },
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
