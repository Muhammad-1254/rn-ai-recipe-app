

// eslint-disable-next-line no-undef

import { isDevelopment, print } from "./utils"

// const serverDomain = !isDevelopment? "http://192.168.2.107:8000": process.env.EXPO_PUBLIC_SERVER_DOMAIN
const serverDomain = "https://ai-recipe-app-server.vercel.app"

const prefix = `${serverDomain}/api/v1`


export const apiRoutes = {
    // post
    signup:`${prefix}/users/register`,
    login:`${prefix}/users/login`,
    logout:`${prefix}/users/logout`,
    getAccessToken:`${prefix}/users/refresh-token`,
    changePassword:`${prefix}/users/change-password`,

    createNewConversation:`${prefix}/gpt/createNewConversation`,
    addConversationMessage:`${prefix}/gpt/addConversationMessage`,

    

    // get
    getUser:`${prefix}/users/current-user`,
    getAllConversations:`${prefix}/gpt/getAllConversations`,
    getConversation:`${prefix}/gpt/getConversation`,
    searchConversations:`${prefix}/gpt/searchConversations`,
    

    // patch 
    saveConversation:`${prefix}/gpt/saveConversation`,
    
    //delete
    deleteConversation:`${prefix}/gpt/deleteConversation`,
    
}