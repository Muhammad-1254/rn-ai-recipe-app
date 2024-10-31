import React from "react";
import { useColorScheme } from "react-native";
import Colors from "@/src/constants/Colors";

import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/src/components/CustomDrawer";
import GeneralModals from "../modals";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="index"
        options={{
          title: "AI Recipe App",
          headerTintColor:
            colorScheme === "dark"
              ? Colors.dark.foreground
              : Colors.light.foreground,
        }}
      />
    </Drawer>
  );
}
