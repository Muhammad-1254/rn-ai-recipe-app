import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setComplexity,
  setCuisine,
  setIngredients,
  setMealType,
} from "../store/chatScreenSlice";
import {
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { useColorScheme } from "nativewind";
import Colors from "../constants/Colors";

const Selection = () => {
  const { _id: chatId } = useAppSelector((s) => s.chatScreen);
  const [isRecipeFixed, setIsRecipeFixed] = useState(false);
  const dispatch = useAppDispatch();
  console.log("chatId", chatId);
  useEffect(() => {
    if (chatId) {
      setIsRecipeFixed(true);
    } else {
      setIsRecipeFixed(false);
    }
  }, [chatId]);

  const setMealTypeHandler = (value: string) => {
    dispatch(setMealType(value));
  };

  const setComplexityHandler = (value: string) => {
    dispatch(setComplexity(value));
  };

  const setCuisineHandler = (value: string) => {
    dispatch(setCuisine(value));
  };

  return (
    <View className="w-full  mt-5">
      {isRecipeFixed ? (
        <RecipeDetailsDisplay isRecipeFixed={isRecipeFixed} />
      ) : (
        <View className="w-full gap-y-8 px-3">
          <IngredientsInput />
          <View className="w-full  gap-y-4">
            <SelectInput
              label={"Meal Type"}
              values={["breakfast", "lunch", "dinner", "snack", "any"]}
              setValue={setMealTypeHandler}
            />
            <SelectInput
              label={"Complexity"}
              values={["easy", "medium", "hard", "any"]}
              setValue={setComplexityHandler}
            />
            <SelectInput
              label={"Cuisine"}
              values={["asian", "american", "european", "african", "any"]}
              setValue={setCuisineHandler}
            />
          </View>
          <Ingredients />
        </View>
      )}
    </View>
  );
};

export default Selection;

const IngredientsInput = () => {
  const { ingredients } = useAppSelector((state) => state.chatScreen);
  const [value, setValue] = useState("");
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();

  const addIngredientsHandler = () => {
    if (value.length > 0) {
      dispatch(setIngredients([...ingredients, value.trim().replace("\n", "")]));
    }
    setValue("");
  };
  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Enter") {
      console.log("enter pressed")
      addIngredientsHandler();
    }
  };
 
  return (
    <View className="w-full flex-row items-center justify-between gap-x-2 ">
      <TextInput
        multiline={true}
        value={value}
        onChangeText={(t)=>!t.includes("\n")&&setValue(t)}
        onKeyPress={handleKeyDown}
        placeholder="Add Ingredients..."
        className="
      flex-1 h-14 rounded-full px-3
      border-border dark:border-borderDark
      bg-secondaryForeground dark:bg-secondaryForegroundDark 
      text-input dark:text-inputDark 
      placeholder:text-mutedForeground placeholder:dark:text-mutedForegroundDark
      "
      />
      <Ionicons
        name="add"
        size={24}
        onPress={addIngredientsHandler}
        color={
          colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary
        }
        style={{
          textAlign: "center",
          textAlignVertical: "center",
          width: 50,
          height: 50,
          borderRadius: 99,
          borderWidth: 1,
          borderColor:
            colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
        }}
      />
    </View>
  );
};

const Ingredients = () => {
  const { ingredients } = useAppSelector((state) => state.chatScreen);
  const dispatch = useAppDispatch();
  const { colorScheme } = useColorScheme();
  const removeIngredientHandler = (value: string) => {
    dispatch(setIngredients(ingredients.filter((v) => v !== value)));
  };

  return (
    <View className={`w-full ${ingredients.length === 0 ? "hidden" : "flex"}`}>
      <Text className="text-xl text-foreground dark:text-foregroundDark">
        Ingredients:
      </Text>

      <ScrollView className="  max-h-72">
        <View className="flex-row flex-wrap gap-4 px-2 py-4 bg-popover dark:bg-popoverDark rounded-b-2xl">
          {ingredients.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => removeIngredientHandler(item)}
              style={{ alignSelf: "flex-start" }}
              className="   px-3 py-1 flex-row  bg-muted dark:bg-mutedDark border border-border dark:border-borderDark rounded-full
              items-center justify-center 
              "
            >
              <Text className="text-foreground dark:text-foregroundDark ">
                {item}&nbsp;&nbsp;
              </Text>
              <Entypo
                name="cross"
                size={20}
                color={
                  colorScheme === "dark"
                    ? Colors.dark.mutedForeground
                    : Colors.light.mutedForeground
                }
                style={{ marginBottom: -2 }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

interface SelectInput {
  label: string;
  values: string[];
  setValue: any;
}
const SelectInput: FC<SelectInput> = ({ label, values, setValue }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className=" w-full items-center">
      <SelectDropdown
        data={values}
        onSelect={(selectedItem) => {
          setValue(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              className=" w-[80%] h-10  flex-row items-center justify-center gap-x-5
          border border-border dark:border-borderDark 
          rounded-full
          "
            >
              <Text className="text-foreground dark:text-foregroundDark capitalize text-base">
                {(selectedItem && selectedItem) || `Select ${label}`}
              </Text>
              <Ionicons
                size={20}
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={
                  colorScheme === "dark"
                    ? Colors.dark.primary
                    : Colors.light.primary
                }
              />
            </View>
          );
        }}
        dropdownStyle={{
          borderColor:
            colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
          borderRadius: 20,
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.popover : Colors.light.popover,
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              key={index}
              className={`
            ${
              isSelected
                ? "bg-muted dark:bg-mutedDark"
                : "bg-popover dark:bg-popoverDark"
            }
            py-2 
              border-muted dark:border-mutedDark
            ${index === values.length - 1 ? "border-b-0" : "border-b"}`}
            >
              <Text
                className={`
                text-foreground dark:text-foregroundDark text-center text-base capitalize
                `}
              >
                {item}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const RecipeDetailsDisplay = ({
  isRecipeFixed,
}: {
  isRecipeFixed: boolean;
}) => {
  const { mealType, complexity, cuisine, ingredients } = useAppSelector(
    (state) => state.chatScreen
  );
  return (
    <View className="w-full px-2">
      <View className="w-full ">
        <Text className="text-foreground dark:text-foregroundDark text-xl ">
          Meal Type:{"   "}
          <Text className="capitalize text-primary dark:text-primaryDark text-lg">{mealType}</Text>
        </Text>
      </View>
      <View className="w-full ">
        <Text className="text-foreground dark:text-foregroundDark text-xl ">
          Cuisine:{"   "}
          <Text className="capitalize text-primary dark:text-primaryDark text-lg">{cuisine}</Text>
        </Text>
      </View>
      <View className="w-full ">
        <Text className="text-foreground dark:text-foregroundDark text-xl ">
          Complexity:{"   "}
          <Text className="capitalize text-primary dark:text-primaryDark text-lg">{complexity}</Text>
        </Text>
      </View>
      <View className="w-full flex-row flex-wrap ">
        <Text className="text-foreground dark:text-foregroundDark text-xl ">
          Ingredients:
        </Text>
        <ScrollView  className=" ">
          <View className="flex-row  gap-2 mt-2 pl-3">
          {ingredients.map((item, index) => (
            <Text
              key={index}
              className="text-foreground dark:text-foregroundDark bg-primary dark:bg-primaryDark px-2.5 py-0.5 rounded-full"
            >
              {item}
            </Text>
          ))}
          </View>

        </ScrollView>
      </View>
    </View>
  );
};
