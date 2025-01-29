import { useAppDispatch } from "@/src/hooks/redux";
import { apiRoutes } from "@/src/lib/apiRoutes";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { setUser as setGlobalUser } from "@/src/store/userSlice";
import Toast from "react-native-toast-message";
import cAxios from "@/src/lib/cAxios";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { print } from "@/src/lib/utils";
const userInitialState = {
  email: "usman@gmail.com",
  password: "12345678",
};

const LoginScreen = () => {
  const [user, setUser] = useState(userInitialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginHandler = async () => {
    try {
      setLoading(true);
      const res = await cAxios.post(apiRoutes.login, user);
      const data = res.data.data;
      if (data.user._id) {
        dispatch(
          setGlobalUser({
            userId: data.user._id,
            username: data.user.username,
            email: data.user.email,
            isAuth: true,
          })
        );
        await SecureStore.setItemAsync("isAuth", "true");
        await SecureStore.setItemAsync("accessToken", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid credentials",
        });
        setLoading(false);
        return;
      }

      setLoading(false);
      router.navigate("/(drawer)");
    } catch (error: any) {
      print("error while signup", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
      setLoading(false);
    }
  };
  return (
    <View className=" flex-1  items-center justify-around px-4">
      <Text className="text-lg text-foreground dark:text-foregroundDark">
        Login to AI based Recipe App
      </Text>

      <View className="w-full items-center gap-y-5">
        <TextInput
          value={user.email}
          onChangeText={(t) => setUser((pre) => ({ ...user, email: t }))}
          placeholder="Enter you Email"
          className="w-full h-14 rounded-full pl-3 pr-1
           text-foreground dark:text-foregroundDark 
           placeholder:text-mutedForeground dark:placeholder:text-mutedForegroundDark
          border border-border dark:border-borderDark "
        />

        <TextInput
          value={user.password}
          onChangeText={(t) => setUser((pre) => ({ ...user, password: t }))}
          placeholder="Enter your password"
          className="w-full h-14 rounded-full pl-3 pr-1
          text-foreground dark:text-foregroundDark 
          placeholder:text-mutedForeground dark:placeholder:text-mutedForegroundDark
         border border-border dark:border-borderDark "
        />
      </View>
      <View className="w-full items-center justify-center gap-y-5">
        <Text className="text-foreground dark:text-foregroundDark opacity-90">
          Don't have account?&nbsp;&nbsp;&nbsp;
          <Link href={"/(auth)/signup"}>
            <Text className="text-blue-600 dark:text-blue-500">
              signup here
            </Text>
          </Link>
        </Text>

        <Pressable
        disabled={loading}
          onPress={loginHandler}
          className="w-1/2 h-14 items-center justify-center rounded-full border border-mutedForeground dark:border-mutedForegroundDark"
        >
          <Text className="text-foreground dark:text-foregroundDark text-lg ">
            {loading ? "login..." : "login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
