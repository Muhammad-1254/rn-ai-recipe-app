import { View, Text, Pressable, Button } from "react-native";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { globalInitialState, setGlobalState } from "@/src/store/global";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { setUser, userInitialState } from "@/src/store/userSlice";
import { chatListInitialState, setChatListData } from "@/src/store/chatListSlice";
import { chatScreenInitialState, setChatScreenData } from "@/src/store/chatScreenSlice";
import cAxios from "@/src/lib/cAxios";
export default function GeneralModals() {
  const { modelType, modelVisible } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const setVisible = (value: boolean) => {
    dispatch(setGlobalState({ modelVisible: value }));
  };
  return (
    <Modal
      visible={modelVisible}
      setVisible={setVisible}
      animationType="fade"
      transparent={true}
    >
      {modelType === "profile" && <Profile />}
    </Modal>
  );
}

const Profile = () => {
  const { username, email } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logoutHandler = async () => {
    setLoading(true);

    await SecureStore.deleteItemAsync("isAuth");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    dispatch(
      setUser({
        userId: null,
        username: null,
        email: null,
        isLoading: false,
        isAuth: false,
      })
    );
    dispatch(setChatListData(chatListInitialState))
    dispatch(setChatScreenData(chatScreenInitialState))
    dispatch(setGlobalState(globalInitialState));
    delete cAxios.defaults.headers.common["Authorization"];
    setLoading(false);


    router.navigate("/(auth)/login");
  };
  return (
    <View className="w-[80%]   bg-card dark:bg-cardDark border border-border dark:border-borderDark rounded-3xl">
      <View className="pt-8 pb-1 border-b border-border dark:border-borderDark">
        <Text className="text-2xl text-foreground dark:text-foregroundDark text-center ">
          Profile
        </Text>
      </View>
      <View className="mt-3 px-4">
        <Text className="text-lg text-primary dark:text-primaryDark">
          Username: <Text className="font-semibold ">{username}</Text>
        </Text>

        <Text className="text-lg text-primary dark:text-primaryDark">
          Email: <Text className="font-semibold ">{email}</Text>
        </Text>
      </View>

      <View className="w-1/2 mt-7 self-end px-4 py-4">
        <Button
          disabled={loading}
          title={loading ? "Loading..." : "Logout"}
          onPress={logoutHandler}
        />
      </View>
    </View>
  );
};
