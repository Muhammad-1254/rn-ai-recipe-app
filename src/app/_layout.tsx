import "./global.css";
import { ErrorBoundary, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "nativewind";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import GeneralModals from "./modals";
import AuthProvider from "./providers/AuthProvider";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <ReduxProvider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
        <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName="(drawer)"
          >
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
          <GeneralModals />
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
