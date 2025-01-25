import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
export default function TabLayout() {
  const router = useRouter();
  useEffect(() => {
    async function checkAuth() {
      const isAuth = await SecureStore.getItemAsync("isAuth");
      console.log("isAuth from auth layout: ", isAuth);
      if (isAuth && isAuth === "true") {
        router.navigate("/(drawer)");
      }
    }
    checkAuth();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
