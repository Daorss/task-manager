import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTaskScreen } from "../screens/AddTaskScreen";
import { TaskDetailsScreen } from "../screens/TaskDetailsScreen";
import { TaskListScreen } from "../screens/TaskListScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack navigator wiring the screens together. Headers are off because each
// screen renders its own custom top bar (AppBar / ScreenHeader).
export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
}
