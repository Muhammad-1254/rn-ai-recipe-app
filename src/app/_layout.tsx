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
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const router = useRouter();
  useEffect(() => {
    async function checkAuth() {
      const isAuth = await SecureStore.getItemAsync("isAuth");
      console.log({isAuth})
      if (!isAuth || isAuth==='false' ) {
        router.navigate("/(auth)/login");
      }
    }
    checkAuth();
  }, []);

  if (!loaded) {
    return null;
  }
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ReduxProvider store={ReduxStore}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
          <GeneralModals />

          <Toast />
        </AuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
