import { createSlice } from "@reduxjs/toolkit";


export type Message = {
  role: string;
  content: string;
};
export type ChatItem = {
  _id:string|null;
  ingredients:string[];
  mealType:string;
  complexity:string;
  cuisine:string;
  messages:Message[]
  createdAt:string|null;
};

type ChatList = {
  chatList: ChatItem[];
  isLoading: boolean;
  hasMore: boolean;
  page: { skip: number; limit: number };
  searchChatItems: ChatItem[];
  searchLoading: boolean;
  searchItemOpen: boolean;
};

export const chatListInitialState: ChatList = {
  chatList: [],
  isLoading: false,
  hasMore: true,
  page: { skip: 0, limit: 20 },
  searchChatItems: [],
  searchLoading: false,
  searchItemOpen: false,
};

const chatListSlice = createSlice({
  name: "chatList",
  initialState:chatListInitialState,
  reducers: {
    setChatListData: (state, action) => {
      for (const key in action.payload) {
        switch (key) {
          case "chatList":
            state.chatList = action.payload.chatList;
            break;
          case "addChatList":
            state.chatList = [...state.chatList, action.payload.addChatList];
            break;
          case "searchChatItems":
            state.searchChatItems = action.payload.searchChatItems;
            break;
          case "searchLoading":
            state.searchLoading = action.payload.searchLoading;
            break;

          case "isLoading":
            state.isLoading = action.payload.isLoading;
            break;
          case "hasMore":
            state.hasMore = action.payload.hasMore;
            break;
          case "page":
            state.page = action.payload.page;
            break;
          default:
            break;
        }
      }
    },
    setAddChatList:(state,action)=>{
      state.chatList=[action.payload, ...state.chatList,]
  }   ,
  },
});

export const { setChatListData,setAddChatList } = chatListSlice.actions;
export default chatListSlice.reducer;
