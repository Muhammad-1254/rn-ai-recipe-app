import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './userSlice'
import ChatScreenReducer from './chatScreenSlice'
import ChatListReducer from './chatListSlice'
import GlobalReducer from './global'


const store = configureStore({
    reducer: {
        user:UserReducer,
        chatScreen:ChatScreenReducer,
        ChatList:ChatListReducer,
        global:GlobalReducer
    },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch