

// eslint-disable-next-line no-undef
// const isDevelopment = process.env.NODE_ENV === 'development';
const isDevelopment = false;


const prefix = isDevelopment?"http://192.168.2.107:8000/api/v1":'https://ai-recipe-app-server.vercel.app';


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