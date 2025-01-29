import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { print } from "@/src/lib/utils";
export default function TabLayout() {
  const router = useRouter();
  useEffect(() => {
    async function checkAuth() {
      const isAuth = await SecureStore.getItemAsync("isAuth");
      print("isAuth from auth layout: ", isAuth);
      if (isAuth && isAuth === "true") {
        router.navigate("/(drawer)");
      }else{
       router.navigate("/(auth)/login"); 
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
