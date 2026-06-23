import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";

// App entry point: safe-area + navigation providers wrap the screen stack.
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
