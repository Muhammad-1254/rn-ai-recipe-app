import Chats from "@/src/components/chats";
import Selection from "@/src/components/Selection";
import UserInput from "@/src/components/UserInput";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import {
  setComplexity,
  setCuisine,
  setMealType,
} from "@/src/store/chatScreenSlice";
import { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const {
    _id: chatId,
    complexity,
    createdAt,
    cuisine,
    ingredients,
    mealType,
    messages,
  } = useAppSelector((s) => s.chatScreen);
  return (
    <View className="flex-1"> 
    <ScrollView className="flex-1 ">
      <Selection />
      <Chats />
      
    </ScrollView>
      <UserInput />
    </View>
  );
}
