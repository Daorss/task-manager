import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Task } from "../types/task";

// Every screen in the app + the params it expects.
export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetails: { task: Task };
};

// Helper so a screen can type its props: RootStackScreenProps<"AddTask">.
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
