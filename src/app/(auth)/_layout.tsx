import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import Colors from "@/src/constants/Colors";

import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/src/components/CustomDrawer";
import { Stack, useRouter } from "expo-router";
import { useAppSelector } from "@/src/hooks/redux";

export default function TabLayout() {
const {isAuth,isLoading} = useAppSelector(s=>s.user)
const router = useRouter()  
useEffect(()=>{
    if(isAuth){
router.navigate("/(drawer)/")
    }
  },[])  

  return (
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
