import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../constants/colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
    mealDeatilsMainConatiner: { width: "100%" },
    mealDeatilsMainWapper: {
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 2,
    },
    mealListTabMainContainer: { paddingLeft: wp(1.53) },
    mealListTabMainWapper: { marginRight: wp(6.66) },
    mealListTabText: {
        color: "#085A5F",
        fontSize: RFPercentage(2.4),
        fontFamily: "Inter_300Light",
        paddingLeft: wp(1.02),
        paddingRight: wp(1.79),
    },
    mainContentWapper: {
        marginTop: hp(9.24),
        paddingRight: wp(11.02),
        paddingLeft: wp(6.92),
    },
    recipeNameView: { alignItems: "center" },
    recipeNameText: {
        color: COLORS.greyText,
        fontSize: RFPercentage(2.9),
        fontFamily: "Inter_600SemiBold",
    },
    recipeTabMainView: { flexDirection: "row", gap: 7, marginTop: hp(1.65) },
    recipeTabContentView: {
        borderRadius: 3,
        paddingVertical: hp(0.8),
        width: "50%",
    },
    recipeTabText: {
        fontSize: RFPercentage(1.8),
        fontFamily: "Inter_600SemiBold",
        textAlign: "center",
    },
    selectedRecipeTabMainView: {
        borderBottomWidth: 1,
        borderBottomColor: "#E2DDDD",
        marginTop: hp(3.79),
    },
    selectedRecipeTabMainText: {
        color: COLORS.black,
        fontSize: RFPercentage(2.4),
        fontFamily: "Inter_300Light",
        paddingBottom: hp(0.8),
    },
    selectedTabMainContent: { height: hp(22) },
    selectedTabMainWapper: { marginTop: hp(1.3), height: "100%" },
    // DescriptionText: {
    //     color: COLORS.greyText,
    //     fontSize: RFPercentage(1.8),
    //     fontFamily: "Inter_400Regular",
    // },
    RecipeText: {
        color: COLORS.greyText,
        fontSize: RFPercentage(1.8),
        fontFamily: "Inter_500Medium",
        lineHeight: hp(2.36),
        paddingBottom: hp(2.36),
    },
    ingredientsMainView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    ingredientsText: {
        color: COLORS.greyText,
        fontSize: RFPercentage(1.8),
        fontFamily: "Inter_500Medium",
        lineHeight: hp(2.36),
        paddingBottom: hp(2.36),
    },
    ingredientsBtnView: {
        backgroundColor: "rgba(39, 211, 222, 0.3)",
        width: wp(6.15),
        height: wp(6.15),
        borderRadius: wp(6.15) / 2,
        borderColor: "#3F3F3F",
        borderWidth: 0.5,
    },
});
const MealDetailsComponent = ({
    selectedMealsData,
    selectedRecipe,
    selectedMealTab,
    activeTab,
    recipeTab,
    handleSetSelectedMeal,
    handleSelectedRecipeTab,
}) => {
    return (
        <View style={styles.mealDeatilsMainConatiner}>
            <View style={styles.mealDeatilsMainWapper}>
                <BottomSheetScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={styles.mealListTabMainContainer}
                >
                    {selectedMealsData.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSetSelectedMeal(index)}
                            style={[
                                styles.mealListTabMainWapper,
                                activeTab === index && {
                                    borderBottomColor: COLORS.primaryNew,
                                    borderBottomWidth: 4,
                                },
                            ]}
                        >
                            <Text style={[styles.mealListTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </BottomSheetScrollView>
            </View>
            {selectedRecipe && (
                <View style={styles.mainContentWapper}>
                    <View style={styles.recipeNameView}>
                        <Text style={styles.recipeNameText}>
                            {selectedRecipe?.name}
                        </Text>
                    </View>
                    <View style={styles.recipeTabMainView}>
                        {recipeTab.map((data, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        handleSelectedRecipeTab(index)
                                    }
                                    style={[
                                        {
                                            backgroundColor:
                                                selectedMealTab === data
                                                    ? "#FBB03F"
                                                    : "rgba(255, 153, 0, 0.22)",
                                        },
                                        styles.recipeTabContentView,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            {
                                                color:
                                                    selectedMealTab === data
                                                        ? COLORS.white
                                                        : COLORS.greyText,
                                            },
                                            styles.recipeTabText,
                                        ]}
                                    >
                                        {data}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View>
                        <View style={styles.selectedRecipeTabMainView}>
                            <Text style={styles.selectedRecipeTabMainText}>
                                {selectedMealTab}
                            </Text>
                        </View>
                        {/* {selectedMealTab === "Description" && (
                        <View style={styles.selectedTabMainContent}>
                            <BottomSheetScrollView
                                style={styles.selectedTabMainWapper}
                                scrollEnabled={true}
                            >
                                <Text style={styles.DescriptionText}>
                                    {/* A description of the recipe.{" "} 
                                    description Data Not Found
                                </Text>
                            </BottomSheetScrollView>
                        </View>
                    )} */}
                        {selectedMealTab === "Recipe" && (
                            <View style={styles.selectedTabMainContent}>
                                <BottomSheetScrollView
                                    style={styles.selectedTabMainWapper}
                                    scrollEnabled={true}
                                >
                                    {selectedRecipe["Recipe instructions"]
                                        .split(",")
                                        .map((ing, index) => {
                                            return (
                                                <View key={index}>
                                                    {index > 0 && (
                                                        <Text
                                                            style={
                                                                styles.RecipeText
                                                            }
                                                        >
                                                            {`Step-${index}`}
                                                            <Text
                                                                style={
                                                                    styles.RecipeText
                                                                }
                                                            >{`${ing}`}</Text>
                                                        </Text>
                                                    )}
                                                </View>
                                            );
                                        })}
                                </BottomSheetScrollView>
                            </View>
                        )}
                        {selectedMealTab === "Ingredients" && (
                            <View style={styles.selectedTabMainContent}>
                                <BottomSheetScrollView
                                    style={styles.selectedTabMainWapper}
                                    scrollEnabled={true}
                                >
                                    {selectedRecipe["Recipe Ingredients"]
                                        .split(":")[1]
                                        .split(",")
                                        .map((ing, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={
                                                        styles.ingredientsMainView
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.ingredientsText
                                                        }
                                                    >{`${ing}`}</Text>
                                                    <View
                                                        style={
                                                            styles.ingredientsBtnView
                                                        }
                                                    >
                                                        <Text
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    RFPercentage(
                                                                        1.8
                                                                    ),
                                                            }}
                                                        >
                                                            ---
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                </BottomSheetScrollView>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

export default MealDetailsComponent;
