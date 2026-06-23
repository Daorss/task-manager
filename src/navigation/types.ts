import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// Every screen in the app + the params it expects.
export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetails: { id: string };
};

// Helper so a screen can type its props: RootStackScreenProps<"AddTask">.
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
