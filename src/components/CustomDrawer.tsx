import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { FC, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ChatItem, setChatListData } from "../store/chatListSlice";
import { apiRoutes } from "../lib/apiRoutes";
import _ from "lodash";
import axios from "axios";
import { timeFromNow } from "../lib/utils";
import { chatScreenInitialState, setChatScreenData } from "../store/chatScreenSlice";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { TextInput } from "react-native-gesture-handler";
import { useColorScheme } from "nativewind";
import { useTheme } from "@react-navigation/native";
import cAxios from "../lib/cAxios";
import React from "react";
import { setGlobalState } from "../store/global";
const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { colorScheme } = useColorScheme();
const dispatch = useAppDispatch()
  const router = useRouter();

  const homeScreenNavigationHandler = () => {
    router.navigate("/(drawer)/");
  };
  const newChatHandler = () => {
    console.log("New chat");
    dispatch(setChatScreenData(chatScreenInitialState));
  };

  return (
    <SafeAreaView>
      <View className="w-full h-full items-start justify-between ">
        {/* header  */}
        <View className="w-full  flex-row justify-between   mt-3 ">
          <Text className=" text-center -ml-2 flex-1 text-foreground dark:text-foregroundDark text-2xl font-bold">
            AI Recipe App
          </Text>
          <View className=" border border-border dark:border-borderDark  rounded-full mr-2">
            <Ionicons
              name="add"
              onPress={newChatHandler}
              size={28}
              color={
                colorScheme === "dark"
                  ? Colors.dark.primary
                  : Colors.light.primary
              }
              style={{ padding: 6 }}
            />
          </View>
        </View>

        <ChatSection />
        <BottomSection />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const ChatSection = () => {
  const [input, setInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const { colorScheme } = useColorScheme();
  const {
    chatList,
    isLoading,
    hasMore,
    page,
    searchChatItems,
    searchItemOpen,
    searchLoading,
  } = useAppSelector((s) => s.ChatList);

  const currentDate = useRef(timeFromNow(new Date().toString()));

  const searchChats = async () => {
    dispatch(setChatListData({ searchLoading: true, searchItemOpen: true }));
    try {
      const res = await cAxios.get(
        `${apiRoutes.searchConversations}?search=${input}`
      );
      const data = res.data.data;
      dispatch(
        setChatListData({ searchChatItems: data, searchLoading: false })
      );
      console.log("Searched chats:", data);
    } catch (error) {
      console.error("Error searching chats:", error);
      dispatch(setChatListData({ searchLoading: false }));
    }
  };
  const debounceSearch = _.debounce((value: string) => {
    if (value.trim()) {
      searchChats();
    }
  }, 500);
  const inputHandler = (value: string) => {
    setInput(value);
    debounceSearch(value);
  };

  const onChatSelect = (chatId: string) => {
    const chat = chatList.find((c) => c._id === chatId);
    console.log("Selected chat:", chat);
    if (chat) {
      dispatch(
        setChatScreenData({
          chatId: chat._id,
          ingredients: chat.ingredients,
          mealType: chat.mealType,
          complexity: chat.complexity,
          cuisine: chat.cuisine,
          messages: chat.messages,
          createdAt: chat.createdAt,
        })
      );
      return;
    }
    // toast({title: "Chat not found", variant: "destructive"});
  };

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(
      setChatListData({
        page: { skip: 0, limit: 20 },
        chatList: [],
        hasMore: true,
      })
    );
    await fetchChats();
    setRefreshing(false);
  };

  const fetchChats = async () => {
    if (isLoading || !hasMore) return;
    dispatch(setChatListData({ isLoading: true }));
    try {
      const res = await cAxios.get(
        `${apiRoutes.getAllConversations}?skip=${page.skip}&limit=${page.limit}`
      );
      const data = res.data.data;
      console.log("Fetched chats:", data);
      dispatch(
        setChatListData({
          chatList: [...chatList, ...data],
          isLoading: false,
          page: { ...page, skip: page.skip + page.limit },
        })
      );
      if (data.length < page.limit) {
        dispatch(setChatListData({ hasMore: false }));
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      dispatch(setChatListData({ loading: false }));
    }
  };

  return (
    <View className="flex-1 w-full ">
      <View className="w-full h-14 gap-x-2 flex-row items-center justify-between px-2 pb-2 mt-2">
        <TextInput
          className="flex-1 h-full
         placeholder:text-mutedForeground placeholder:dark:text-mutedForegroundDark pl-3 pr-2
         text-foreground dark:text-foregroundDark
         rounded-full
         border border-border dark:border-borderDark "
          value={input}
          
          onChangeText={inputHandler}
          placeholder="Search history..."
        />

        <Ionicons
          name="search"
          size={24}
          style={{
            width: 44,
            height: 44,
            textAlign: "center",
            textAlignVertical: "center",
            borderWidth: 1,
            borderRadius: 99,
            borderColor:
              colorScheme == "dark" ? Colors.dark.border : Colors.light.border,
          }}
          color={
            colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary
          }
        />
      </View>

      <FlatList
        className=""
        data={chatList}
        // keyExtractor={(item)=>item.}
        renderItem={({ index, item }) => (
          <RenderItem
            currentDate={currentDate}
            itemLen={chatList.length}
            index={index}
            item={item}
            onChatSelect={onChatSelect}
            
          />
        )}
        onEndReached={fetchChats}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={FlatListFooter}
      />
    </View>
  );
};

interface RenderItemProps {
  item: ChatItem;
  index: number;
  itemLen: number;
  onChatSelect: (chatId: string) => void;
  currentDate: React.MutableRefObject<string>;
}
const RenderItem: FC<RenderItemProps> = ({
  index,
  item,
  itemLen,
  onChatSelect,
  currentDate,
}) => {
  let content = item.messages.find((m) => m.role === "user")?.content;
  try {
    if (content) {
      content = JSON.parse(content)?.prompt;
    }
  } catch (error) {}

  const tempDate = timeFromNow(item.createdAt!);
  const shouldDateDisplay = currentDate.current !== tempDate;
  currentDate.current = tempDate;

  return (
    <>
      {shouldDateDisplay && (
        <Text  className="text-foreground dark:text-foregroundDark opacity-70 underline  text-center  mt-2">
          {tempDate}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => onChatSelect(item._id!)}
        className={`w-full 
  bg-card dark:bg-cardDark 
  py-4 pl-2 pr-1

  border-border dark:border-borderDark
border-b
  ${index === 0 && "border-t "}
`}
      >
        <Text
          className="text-foreground dark:text-foregroundDark opacity-85 "
          numberOfLines={1}
        >
          {content}
        </Text>
      </TouchableOpacity>
    </>
  );
};


const FlatListFooter = ()=>{
  const {hasMore,isLoading,chatList} = useAppSelector(s=>s.ChatList)
  return(
      <Text
      className="text-foreground dark:text-foregroundDark opacity-75 text-center ">
        {
          !isLoading && !hasMore?"No more Chats Found":
          isLoading?"Loading...":
          chatList.length===0&&"No Chats Found"
        }
      </Text>
  )
}
const BottomSection = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const {modelType,modelVisible} = useAppSelector(s=>s.global)
  const dispatch = useAppDispatch()
  const  showProfileHandler =  ()=>{
    dispatch(setGlobalState({modelVisible:true,modelType:"profile"}))
  }
  return (
    <View className="w-full   flex flex-row items-center justify-between px-4 py-2 border-t border-border  dark:border-borderDark">
      <MaterialIcons
      onPress={toggleColorScheme}
        name={colorScheme==='dark'?"dark-mode":"light-mode"}
        size={24}
        color={
          colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary
        }
        style={{
          width: 48,
          height: 48,
          textAlign: "center",
          textAlignVertical: "center",
          borderWidth: 1,
          borderRadius: 99,
          borderColor:
            colorScheme == "dark" ? Colors.dark.border : Colors.light.border,
        }}
      />


      <MaterialCommunityIcons
        name="account"
        size={24}
        onPress={showProfileHandler}
        color={
          colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary
        }
        
        style={{
          width: 48,
          height: 48,
          textAlign: "center",
          textAlignVertical: "center",
          borderWidth: 1,
          borderRadius: 99,
          borderColor:
            colorScheme == "dark" ? Colors.dark.border : Colors.light.border,
        }}
      />
    </View>
  );
};
