import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Toast from "react-native-toast-message";
import { setChatScreenData } from "../store/chatScreenSlice";
import cAxios from "../lib/cAxios";
import { apiRoutes } from "../lib/apiRoutes";
import { Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setAddChatList } from "../store/chatListSlice";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Colors from "../constants/Colors";

export default function UserInput() {
  const [input, setInput] = useState("");
  const [inputFiledHeight, setInputFieldHeight] = useState(48);
  const dispatch = useAppDispatch();
  const { _id: chatId, messageLoading } = useAppSelector(
    (state) => state.chatScreen
  );
  const {colorScheme} = useColorScheme();

  const { ingredients, mealType, cuisine, complexity } = useAppSelector(
    (state) => state.chatScreen
  );

  const validateConversation = () => {
    
    if (!input) {
      Toast.show({
        text1: "Please enter a prompt",
        type: "error",
      });
      return false;
    }
    return true;
  };
  const handlePromptSubmit = async () => {

    if (chatId) {
      dispatch(setChatScreenData({ messageLoading: true }));
      try {
        const res = await cAxios.post(apiRoutes.addConversationMessage, {
          prompt: input,
          conversationId: chatId,
        });
        const data = res.data.data;
        console.log("data", data);
        if (data._id) {
          dispatch(
            setChatScreenData({
              messages: data.messages,
              messageLoading: false,
            })
          );
        } else {
          dispatch(setChatScreenData({ messageLoading: false }));
          Toast.show({
            text1: data.message,
            type: "error",
          });
        }
      } catch (error) {
        console.log("error while conversation", error);
        dispatch(setChatScreenData({ messageLoading: false }));
      }
    } else {
      // create a new chat
      if (!validateConversation()) return;
      dispatch(setChatScreenData({ messageLoading: true }));
      try {
        const res = await cAxios.post(apiRoutes.createNewConversation, {
          ingredients: ingredients ?? "any",
          mealType: mealType ?? "any",
          cuisine: cuisine ?? "any",
          complexity: complexity ?? "any",
          prompt: input,
        });
        const data = res.data.data;
        console.log("data", data);
        if (data._id) {
          dispatch(
            setChatScreenData({
              _id: data._id,
              messages: data.messages,
              createdAt: data.createdAt,
              messageLoading: false,
            })
          );
          // for new chat add chat to chatList
          dispatch(setAddChatList(data));
        } else {
          dispatch(setChatScreenData({ messageLoading: false }));
          Toast.show({
            text1: data.message,
            type: "error",
          });
        }
      } catch (error) {
        console.log("error while create new conversation", error);
        dispatch(setChatScreenData({ messageLoading: false }));
      }

    //   setInput("");
    }
  };
  useEffect(()=>{
    if(input.includes("\n")||input.includes("\r")||input.length>40){
      
setInputFieldHeight(130)
    }else{
        setInputFieldHeight(48)
    }

  },[input])

  return (
    <View
      className="w-full  bg-popover dark:bg-popoverDark border-t border-border dark:border-borderDark
      flex-row items-center justify-between
      gap-x-2
      pb-3 pt-2 px-2  "
    >
      <TextInput
      multiline={true}
      style={{height:inputFiledHeight}}
      numberOfLines={4}
        className="flex-1 
        
        bg-foreground dark:bg-foregroundDark
        text-input dark:text-inputDark
        placeholder:text-mutedForeground placeholder:dark:text-mutedForegroundDark
        rounded-3xl
        px-4 pt-4 pb-3  "
        placeholder="Type Your Message Here!"
        value={input}
        textAlignVertical="top"
        onChangeText={setInput}
      />

        <MaterialIcons
        name="send"
        size={28}
        color={colorScheme==='dark'?Colors.dark.primary:Colors.light.primary}
        style={{
            width: 50,
            height: 50,
            textAlign: "center",
            textAlignVertical: "center",
            borderWidth: 1,
            borderColor:colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
            borderRadius: 99,

        }}
        onPress={handlePromptSubmit}
        disabled={messageLoading}
        />
    </View>
  );
}
