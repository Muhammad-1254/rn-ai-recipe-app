import { ActivityIndicator, Image, Text, View } from "react-native";
import { useAppSelector } from "../hooks/redux";
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import Colors from "../constants/Colors";
import { getMarkdownStyles, print } from "../lib/utils";

const Chats = () => {
  const { messages, messageLoading } = useAppSelector(
    (state) => state.chatScreen
  );
  const { colorScheme } = useColorScheme();

  return (
    <View className="relative  items-center w-full my-4 px-2 gap-y-4 ">
      {messages.map((message, _) => {
        if (
          message.content &&
          (message?.role === "user" || message?.role === "assistant")
        ) {
          let content = message.content;
          try {
            content = JSON.parse(content)?.prompt;
          } catch (error) {
            print("error", error);
          }
          return (
            <View
              key={_}
              className={` flex-row w-full  items-start   gap-x-2  
                ${message.role === "user" ? "flex-row " : "flex-row-reverse mb-14"}
                `}
            >
              <View className="w-12 aspect-square  bg-primary dark:bg-primaryDark rounded-full  p-1.5  items-center justify-center">
                {message.role === "assistant" ? (
                  <MaterialCommunityIcons
                  name="robot-excited-outline" 
                  size={24}
                  color={colorScheme==='dark'?Colors.dark.foreground:Colors.light.foreground}
               

                   />
                ) : (
                  <Ionicons name="person" size={24} 
                  color={colorScheme==='dark'?Colors.dark.foreground:Colors.light.foreground}
                  />
                )}
              </View>

              <View
                className={`flex-1 w-full   p-4 overflow-x-auto rounded-2xl
                  border border-border dark:border-borderDark 
                    ${
                    message.role === "user"
                      ? "bg-accent dark:bg-accentDark"
                      : "bg-card dark:bg-cardDark"
                  }
                `}
              >
                {message.role === "user" ? (
                  <Text className="text-foreground dark:text-foregroundDark ">
                    {content}
                  </Text>
                ) : (
                  // @ts-ignore 
                  <Markdown mergeStyle={true} style={getMarkdownStyles(colorScheme)}>
                  {content}
                </Markdown>
                )}
              </View>
            </View>
          );
        }
      })}
      {messageLoading && <MessageLoadingSkeleton />}
    </View>
  );
};

export default Chats;


const MessageLoadingSkeleton = () => {
  const { colorScheme } = useColorScheme();
  return (
<ActivityIndicator
size={'large'}
color={colorScheme==='dark'?Colors.dark.primary:Colors.light.primary}

/>
  );
};
