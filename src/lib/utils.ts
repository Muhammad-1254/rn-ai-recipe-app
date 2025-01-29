import moment from "moment";
import Colors from "../constants/Colors";


export const print = (...args:any)=>{
  if(isDevelopment){
    console.log(...args)
  }  
}



export const isDevelopment = process.env.EXPO_PUBLIC_NODE_ENV ==='development';
print({isDevelopment})

export const timeFromNow = (date: string) => {
  const now = moment();
  const inputDate = moment(date);

  // const diffInMinutes = now.diff(inputDate, 'minutes');
  // const diffInHours = now.diff(inputDate, 'hours');
  const diffInDays = now.diff(inputDate, "days");
  const diffInWeeks = now.diff(inputDate, "weeks");
  const diffInMonths = now.diff(inputDate, "months");
  const diffInYears = now.diff(inputDate, "years");

  // if (diffInMinutes < 60) {
  // return `${diffInMinutes} minutes ago`;
  // } else if (diffInHours < 24) {
  // return `${diffInHours} hours ago`;
  // } else if (diffInDays < 7) {
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    return `${diffInYears} years ago`;
  }
};


export const getMarkdownStyles = (colorScheme?: "light" | "dark") => {
  return {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    heading1: {
      fontSize: 24,
      fontWeight: "bold",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    heading2: {
      fontSize: 20,
      fontWeight: "bold",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    heading3: {
      fontSize: 18,
      fontWeight: "600",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    heading4: {
      fontSize: 16,
      fontWeight: "600",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    heading5: {
      fontSize: 14,
      fontWeight: "600",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    heading6: {
      fontSize: 12,
      fontWeight: "600",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },

    blockquote: {
      backgroundColor:
        colorScheme === "dark"
          ? Colors.dark.background
          : Colors.light.background,
      borderLeftWidth: 4,
      borderColor:
        colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
      padding: 8,
    },

    paragraph: {
      fontSize: 16,
      lineHeight: 24,
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    text:{
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },

    textgroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color:colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    span:{
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,

    },
    inline:{
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },

    // Lists
    bullet_list: {
      marginVertical: 8,
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    ordered_list: {
      marginVertical: 8,
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
    bullet_list_icon: {
      fontSize: 8,
      marginRight: 8,
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    }, // Dots for bullet points
    ordered_list_number: { fontWeight: "bold", marginRight: 8 },
    list_item: {
      flexDirection: "row",
      alignItems: "flex-start",
      color:
        colorScheme === "dark"
          ? Colors.dark.foreground
          : Colors.light.foreground,
    },
   
    // Text styling
    em: { fontStyle: "italic" }, // Italics for emphasis
    strong: { fontWeight: "bold" }, // Bold for strong text
    link: { textDecorationLine: "underline", color: "#1E90FF" }, // Links

    // Image styling
    image: {
      width: "100%",
      height: 200, // Set a base height, can adjust dynamically if needed
      borderWidth: 1,
      borderColor:
        colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
      borderRadius: 16,
      object:'cover',
      background:"center",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      alignSelf: "center",
  }}
};
