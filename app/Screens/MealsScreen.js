import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { images } from "../Resource/Images";
import { Image } from "react-native";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MealDetailsComponent from "../Components/Home/MealDetailsComponent";
import HomeScreenMainComponent from "../Components/Home/HomeScreenMainComponent";
import { ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import COLORS from "../constants/colors";
import showToast from "../Components/Core/CustomTost";
import { translations } from "../Language";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  mainWelcomeContainer: {
    flex: 1,
  },
  welComeBgImg: {
    height: screenHeight,
    width: screenWidth,
  },
});
const MealsScreen = () => {
  const sheetRef = useRef(null);
  const currentLanguage = useSelector((state) => state.language.language);
  const recipeTab = [
    { label: translations[currentLanguage].ingredients, value: "Ingredients" },
    { label: translations[currentLanguage].recipe, value: "Recipe" },
  ];
  const selectedTab = recipeTab[0].value;
  const [mealList, setMealList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMealTab, setselectedMealTab] = useState(selectedTab);
  const [selectedMealsData, setSelectedMealsData] = useState([]);

  const handleDateNavigation = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === "yesterday") {
      newDate.setDate(selectedDate.getDate() - 1);
    } else if (direction === "tomorrow") {
      newDate.setDate(selectedDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const getDaywiseFoodgroup = async () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[selectedDate.getDay()];
    const selectedMeals = JSON.parse(
      await AsyncStorage.getItem("selectedMeal")
    );
    const updatedSelectedItems = selectedMeals.map((item) => item);
    if (updatedSelectedItems.includes("Morning Snack")) {
      const findMSnackIndex = updatedSelectedItems.findIndex(
        (item) => item === "Morning Snack"
      );
      if (findMSnackIndex > -1) {
        updatedSelectedItems[findMSnackIndex] = "Snack 1";
      }
    }
    if (updatedSelectedItems.includes("Afternoon Snack")) {
      const findASnackIndex = updatedSelectedItems.findIndex(
        (item) => item === "Afternoon Snack"
      );
      if (findASnackIndex > -1) {
        updatedSelectedItems[findASnackIndex] = "Snack 2";
      }
    }
    try {
      setIsLoading(true);
      const payload = {
        mealType: updatedSelectedItems,
        day: day,
      };
      const url = getUrl("findDayWise");
      const res = await post(url, payload);
      const { success, data, message } = res;
      if (success) {
        setIsLoading(false);
        const updateData = [...data.mealData];
        let filteredData = [];
        updateData.map((mealData) => {
          if (mealData.Meal === "Breakfast") {
            mealData.Meal = translations[currentLanguage].breakfast;
          } else if (mealData.Meal === "Snack 1") {
            mealData.Meal = translations[currentLanguage].morningSnack;
          } else if (mealData.Meal === "Lunch") {
            mealData.Meal = translations[currentLanguage].lunch;
          } else if (mealData.Meal === "Snack 2") {
            mealData.Meal = translations[currentLanguage].afternoonSnack;
          } else if (mealData.Meal === "Dinner") {
            mealData.Meal = translations[currentLanguage].dinner;
          }
          mealData.Items.map((item) => {
            if (item.Type === "Recipe") {
              filteredData.push(mealData);
            }
          });
        });
        const updateRecipeSelectedMeal = filteredData.map((item) => item.Meal);
        filteredData.map((data) => {
          let des = "";
          data.Items.map((item) => {
            des = `${des}\n${item.name}-${item.quantity}`;
          });
          data.description = des;
          if (data.Meal === "Breakfast") {
            data.Meal = translations[currentLanguage].breakfast;
          } else if (data.Meal === "Snack 1") {
            data.Meal = translations[currentLanguage].morningSnack;
          } else if (data.Meal === "Lunch") {
            data.Meal = translations[currentLanguage].lunch;
          } else if (data.Meal === "Snack 2") {
            data.Meal = translations[currentLanguage].afternoonSnack;
          } else if (data.Meal === "Dinner") {
            data.Meal = translations[currentLanguage].dinner;
          }
          return data;
        });
        const RecipeData = filteredData.length > 0 && filteredData[0].Items.filter(
          (itemData) => itemData.Type === "Recipe"
        );
        if (RecipeData) {
          setSelectedRecipe(RecipeData[0]);
          handleSnapPress(0);
          setSelectedMealsData(updateRecipeSelectedMeal);
          setMealList(filteredData);
        } else {
          handleSnapPress(-1);
          setSelectedRecipe(null)
          setSelectedMealsData([]);
          setMealList([])
        }
      } else {
        setIsLoading(false);
        showToast("error", message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", translations[currentLanguage].internalServerError);
    }
  };
  const handleSnapPress = useCallback((index) => {
    sheetRef?.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    getDaywiseFoodgroup();
  }, [currentLanguage]);
  useFocusEffect(
    React.useCallback(() => {
      getDaywiseFoodgroup();
    }, [])
  );
  return (
    <SafeAreaView style={styles.mainWelcomeContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
          source={images.homeTabBG} // Use the imported image here
          resizeMode="stretch"
          style={styles.welComeBgImg}
        >
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={"#FF9900"} />
            </View>
          ) : (
            <HomeScreenMainComponent
              handleDateNavigation={handleDateNavigation}
              selectedDate={selectedDate}
              mealList={mealList}
              daysbuttonDisabled={true}
            />
          )}
          <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={[hp(75)]}
            enablePanDownToClose={selectedRecipe ? false : true}
            backgroundStyle={{ borderRadius: 40 }}
            handleIndicatorStyle={{
              backgroundColor: COLORS.white,
            }}
            handleComponent={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    marginTop: -hp(14.09),
                    padding: 0,
                  }}
                >
                  <Image
                    source={images.foodImage}
                    style={{
                      width: wp(48.46),
                      height: wp(48.46),
                    }}
                  />
                </View>
              );
            }}
          >
            <BottomSheetScrollView
              contentContainerStyle={{ backgroundColor: "white" }}
            >
              <MealDetailsComponent
                recipeTab={recipeTab}
                selectedMealsData={selectedMealsData}
                selectedRecipe={selectedRecipe}
                selectedMealTab={selectedMealTab}
                activeTab={activeTab}
                handleSetSelectedMeal={(index) => {
                  setActiveTab(index);
                  setselectedMealTab(recipeTab[0].value);
                  const RecipeData = mealList[index].Items.filter(
                    (itemData) => itemData.Type === "Recipe"
                  );
                  setSelectedRecipe(RecipeData[0]);
                }}
                handleSelectedRecipeTab={(index) => {
                  setselectedMealTab(recipeTab[index].value);
                }}
              />
            </BottomSheetScrollView>
          </BottomSheet>
        </ImageBackground>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default MealsScreen;
