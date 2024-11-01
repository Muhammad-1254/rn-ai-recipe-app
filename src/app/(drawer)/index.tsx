import Chats from "@/src/components/chats";
import Selection from "@/src/components/Selection";
import UserInput from "@/src/components/UserInput";
import { Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function TabOneScreen() {
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
