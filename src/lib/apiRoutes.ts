

// eslint-disable-next-line no-undef
// const isDevelopment = process.env.NODE_ENV === 'development';
const isDevelopment = false;


const prefix = isDevelopment?"http://localhost:8000/api/v1":'https://waheed-ai-recipe-app-server.vercel.app/api/v1';


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