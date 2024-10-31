import { useAppDispatch } from "@/src/hooks/redux";
import { apiRoutes } from "@/src/lib/apiRoutes";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { setUser as setGlobalUser } from "@/src/store/userSlice";
import Toast from "react-native-toast-message";
import cAxios from "@/src/lib/cAxios";

const userInitialState = {
  email: "usman123",
  username: "usman123@gmail.com",
  password: "12345678",
  confirmPassword: "12345678",
};

const LoginScreen = () => {
  const [user, setUser] = useState(userInitialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signupHandler = async () => {
// @ts-ignore 
    for (const key in user) {
      if (user[key].trim() === "") {
        Toast.show({
          type: "error",
          text1: "Please fill all the fields",
        });

        return;
      }
    }
    if (user.password !== user.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password does not match",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await cAxios.post(apiRoutes.signup, user);
      const data = res.data.data;
      console.log("data", data);
      if (data._id) {
        Toast.show({
          type: "success",
          text1: "User created successfully",
          text2: "Please login to continue",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: res.data?.message,
        });
      }
      setLoading(false);
    } catch (error: any) {
      console.log("error while signup", error);
      if (error?.status === 409) {
        Toast.show({
          type: "error",
          text1: "User with email or username already exists",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error.response.data.message,
        });
      }
      setLoading(false);
    }
  };

  return (
    <View className=" flex-1  items-center justify-around px-4">
      <Text className="text-lg text-foreground dark:text-foregroundDark">
        Register to AI based Recipe App
      </Text>

      <View className="w-full items-center gap-y-5">
        <TextInput
          value={user.username}
          onChangeText={(t) => setUser((pre) => ({ ...pre, username: t }))}
          placeholder="username"
          className="w-full h-14 rounded-full pl-3 pr-1
         text-foreground dark:text-foregroundDark 
         placeholder:text-mutedForeground dark:placeholder:text-mutedForegroundDark
        border border-border dark:border-borderDark "
        />

        <TextInput
          value={user.email}
          onChangeText={(t) => setUser((pre) => ({ ...pre, email: t }))}
          placeholder="Email"
          className="w-full h-14 rounded-full pl-3 pr-1
         text-foreground dark:text-foregroundDark 
         placeholder:text-mutedForeground dark:placeholder:text-mutedForegroundDark
        border border-border dark:border-borderDark "
        />
        <TextInput
          value={user.password}
          onChangeText={(t) => setUser((pre) => ({ ...pre, password: t }))}
          placeholder="Password"
          className="w-full h-14 rounded-full pl-3 pr-1
         text-foreground dark:text-foregroundDark 
         placeholder:text-mutedForeground dark:placeholder:text-mutedForegroundDark
        border border-border dark:border-borderDark "
        />

        <TextInput
          value={user.confirmPassword}
          onChangeText={(t) =>
            setUser((pre) => ({ ...pre, confirmPassword: t }))
          }
          placeholder="Confirm Password"
          className="w-full h-14 rounded-full pl-3 pr-1
        text-foreground dark:text-foregroundDark 
        placeholder:text-mutedForeground dark:placeholder:text-mutedForegroundDark
       border border-border dark:border-borderDark "
        />
      </View>
      <View className="w-full items-center justify-center gap-y-5">
        <Text className="text-foreground dark:text-foregroundDark opacity-90">
          Already have an Account?&nbsp;&nbsp;&nbsp;
          <Link href={"/(auth)/login"}>
            <Text className="text-blue-600 dark:text-blue-500">login here</Text>
          </Link>
        </Text>

        <Pressable
        disabled={loading}
          onPress={signupHandler}
          className="w-1/2 h-14 items-center justify-center rounded-full border border-mutedForeground dark:border-mutedForegroundDark"
        >
          <Text className="text-foreground dark:text-foregroundDark text-lg ">
            {loading ? "Registering..." : "Register"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
