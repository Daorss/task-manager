import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TasksProvider } from "./src/context/TasksContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

// App entry point: safe-area + tasks state + navigation providers wrap the stack.
export default function App() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TasksProvider>
    </SafeAreaProvider>
  );
}
