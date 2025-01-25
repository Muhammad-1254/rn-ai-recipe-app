import React, { useEffect } from "react";
import { Button, useColorScheme } from "react-native";
import Colors from "@/src/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/src/components/CustomDrawer";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/src/hooks/redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.user);

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await SecureStore.getItemAsync("isAuth");
      if (!isAuth) {
        router.navigate("/(auth)/login");
      }else if(isAuth==='false'){
        router.navigate("/(auth)/login");
      }
    }
    checkAuth();
  }, []);


  return (
    <Drawer drawerContent={(props:any) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="index"
        options={{
          title: "AI Recipe App",
          headerTintColor:
            colorScheme === "dark"
              ? Colors.dark.foreground
              : Colors.light.foreground,
          headerRight: () =>
            !isAuth ? (
              <Button
                title="Login"
                onPress={() => router.navigate("/(auth)/login")}
              />
            ) : null,
        }}
      />
    </Drawer>
  );
}
