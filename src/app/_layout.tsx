import "./global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   ...FontAwesome.font,
  // });

  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  const { colorScheme } = useColorScheme();
  return (
    // <ReduxProvider store={ReduxStore}>
    //   <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    //     <AuthProvider>

    <Stack screenOptions={{ headerShown: false }} initialRouteName="/(drawer)">
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
    // <Toast />
    // <GeneralModals />
    //     </AuthProvider>
    //   </ThemeProvider>
    // </ReduxProvider>
  );
}
