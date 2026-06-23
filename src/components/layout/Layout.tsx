import { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";

// Per-screen shell: safe-area handling + status bar. Each screen renders its
// own header (AppBar or ScreenHeader) as the first child.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  );
}
