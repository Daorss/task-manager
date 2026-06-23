import { ReactNode } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { AppBar } from "./AppBar";

// App shell: safe-area handling, status bar, and the persistent top bar.
// Screens are rendered as children below the AppBar.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <StatusBar style="dark" />
        <AppBar />
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
