import "./global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider as ReduxProvider } from "react-redux";
import ReduxStore from "../store";
import { useColorScheme, verifyInstallation } from "nativewind";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import GeneralModals from "./modals";
import AuthProvider from "./providers/AuthProvider";
import * as SecureStore from "expo-secure-store";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
  const { colorScheme } = useColorScheme();
  return (
    <ReduxProvider store={ReduxStore}>
<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> 
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} initialRouteName="/(drawer)/">
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
