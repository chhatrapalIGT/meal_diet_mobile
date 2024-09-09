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
import { useRoute } from "@react-navigation/native";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native";
import HomeScreenMainComponent from "../Components/Home/HomeScreenMainComponent";
import MealDetailsComponent from "../Components/Home/MealDetailsComponent";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import COLORS from "../constants/colors";
import showToast from "../Components/Core/CustomTost";

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
const HomeScreen = () => {
    const route = useRoute();
    const sheetRef = useRef(null);

    const { selectedItems } = route.params;
    // const recipeTab = ["Description", "Recipe", "Ingredients"];
    const recipeTab = ["Ingredients", "Recipe"];

    const [mealList, setMealList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedMealTab, setselectedMealTab] = useState(recipeTab[0]);
    const [selectedMealsData, setSelectedMealsData] = useState([]);

    const handleDateNavigation = (direction) => {
        sheetRef?.current?.close();
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
        const updatedSelectedItems = selectedItems.map((item) => item);
        if (updatedSelectedItems.includes("Morning snack")) {
            const findMSnackIndex = updatedSelectedItems.findIndex(
                (item) => item === "Morning snack"
            );
            if (findMSnackIndex > -1) {
                updatedSelectedItems[findMSnackIndex] = "Snack 1";
            }
        }
        if (updatedSelectedItems.includes("Afternoon snack")) {
            const findASnackIndex = updatedSelectedItems.findIndex(
                (item) => item === "Afternoon snack"
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
                updateData.map((data) => {
                    let des = "";
                    data.Items.map((item) => {
                        des = `${des}\n${item.name}-${item.quantity}`;
                    });
                    data.description = des;
                    if (data.Meal === "Snack 1") {
                        data.Meal = "Morning snack";
                    } else if (data.Meal === "Snack 2") {
                        data.Meal = "Afternoon snack";
                    }

                    return data;
                });
                setMealList(updateData);
            } else {
                setIsLoading(false);
                showToast("error", message);
            }
        } catch (error) {
            setIsLoading(false);
            showToast("error", "Internal server error.");
        }
    };
    const handleSnapPress = useCallback((index) => {
        sheetRef?.current?.snapToIndex(index);
    }, []);

    useEffect(() => {
        getDaywiseFoodgroup();
    }, [selectedDate, selectedItems]);

    const handleSheetChange = useCallback((index) => {
        if (index === -1) {
            setActiveTab(0);
            setselectedMealTab(recipeTab[0]);
        }
    }, []);
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
                            handleMealDetailsForRecipe={(meal, item) => {
                                handleSnapPress(0);
                                setSelectedRecipe(item ? item : null);
                                setSelectedMealsData(meal ? [meal] : []);
                            }}
                        />
                    )}
                    <BottomSheet
                        ref={sheetRef}
                        index={-1}
                        snapPoints={[hp(75)]}
                        enablePanDownToClose={true}
                        backgroundStyle={{ borderRadius: 40 }}
                        handleIndicatorStyle={{
                            backgroundColor: COLORS.white,
                        }}
                        onChange={handleSheetChange}
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
                                            width: 189,
                                            height: 189,
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
                                    const RecipeData = mealList[
                                        index
                                    ].Items.filter(
                                        (itemData) => itemData.Type === "Recipe"
                                    );
                                    setSelectedRecipe(
                                        RecipeData[0] ? RecipeData[0] : null
                                    );
                                }}
                                handleSelectedRecipeTab={(index) => {
                                    setselectedMealTab(recipeTab[index]);
                                }}
                            />
                        </BottomSheetScrollView>
                    </BottomSheet>
                </ImageBackground>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

export default HomeScreen;
