import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import CommonButton from "./Core/CommonButton";
import COLORS from "../constants/colors";
import { translations } from "../Language";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
    selectMealContainer: { flex: 1, marginTop: hp(18.12) },
    selectMealMainContent: {
        flex: 4.6,
        marginHorizontal: wp(9.23),
    },
    selectMealTitleView: { marginBottom: hp(2.72) },
    selectMealTitleText: {
        fontSize: RFPercentage(2.9),
        color: COLORS.black,
        fontFamily: "Inter_300Light",
    },
    selectMealMainView: {
        paddingVertical: hp(2.13),
        paddingHorizontal: wp(5.38),
        borderRadius: 10,
        justifyContent: "center",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: hp(2.48),
    },
});

const SelectMeal = ({
    handleSelectMeal,
    mainContainerStyle,
    mainFooterStyle,
    selectedMeal = [],
}) => {
    const currentLanguage = useSelector((state) => state.language.language);
    // const intialMealData = [
    //     translations[currentLanguage].breakfast,
    //     translations[currentLanguage].morningSnack,
    //     translations[currentLanguage].lunch,
    //     translations[currentLanguage].afternoonSnack,
    //     translations[currentLanguage].dinner,
    // ];
    const intialMealData = [
        { label: translations[currentLanguage].breakfast, value: "Breakfast" },
        {
          label: translations[currentLanguage].morningSnack,
          value: "Morning Snack",
        },
        { label: translations[currentLanguage].lunch, value: "Lunch" },
        {
          label: translations[currentLanguage].afternoonSnack,
          value: "Afternoon Snack",
        },
        { label: translations[currentLanguage].dinner, value: "Dinner" },
      ];
      const mealData =
        selectedMeal.length === 0
          ? intialMealData
          : intialMealData.filter((item) => selectedMeal.includes(item.value));
    
    
    const [selectedFoodGroupList, setSelectedFoodGroupList] = useState([]);
    const handleMealButtonPress = (meal) => {
        if (selectedFoodGroupList.includes(meal)) {
            const filterData = selectedFoodGroupList.filter(
                (item) => item !== meal
            );
            setSelectedFoodGroupList(filterData);
        } else {
            setSelectedFoodGroupList([...selectedFoodGroupList, meal]);
        }
    };
    return (
        <View style={{ ...styles.selectMealContainer, ...mainContainerStyle }}>
            <View style={styles.selectMealMainContent}>
                <View style={styles.selectMealTitleView}>
                    <Text style={styles.selectMealTitleText}>
                        {selectedMeal.length === 0
                            ? translations[currentLanguage].mealListHeader
                            :  translations[currentLanguage].selectedMealsText}
                    </Text>
                </View>
                <View>
                    {mealData.map((meal, index) => {
                        return (
                            <View key={`meal-${index}`}>
                                {selectedMeal.length === 0 ? (
                                    <TouchableOpacity
                                        key={`meal-${index}`}
                                        onPress={() =>
                                            handleMealButtonPress(meal.value)
                                        }
                                        style={{
                                            ...styles.selectMealMainView,
                                            backgroundColor:
                                                selectedFoodGroupList.includes(
                                                    meal.value
                                                )
                                                    ? COLORS.active
                                                    : COLORS.white,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.4),
                                                fontFamily: "Inter_700Bold",
                                                color: selectedFoodGroupList.includes(
                                                    meal.value
                                                )
                                                    ? COLORS.white
                                                    : COLORS.greyText,
                                            }}
                                        >
                                            {meal.label}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View
                                        key={`meal-${index}`}
                                        style={{
                                            ...styles.selectMealMainView,
                                            backgroundColor: COLORS.active,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.4),
                                                fontFamily: "Inter_700Bold",
                                                color: COLORS.white,
                                            }}
                                        >
                                            {meal.label}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
            <View
                style={{
                    flex: 1.4,
                    justifyContent: "flex-end",
                    ...mainFooterStyle
                }}
            >
                <CommonButton
                    btnTitle={translations[currentLanguage].next}
                    onPress={() => {
                        const newUpdateData =
                            selectedMeal.length === 0
                                ? selectedFoodGroupList
                                : selectedMeal;
                        const orderMap = intialMealData.map((item) => item.value);
                        newUpdateData.sort((a, b) => orderMap.indexOf(a) - orderMap.indexOf(b));                        
                        handleSelectMeal(
                            newUpdateData.length === 0
                                ? orderMap
                                : newUpdateData
                        );
                        setSelectedFoodGroupList([]);
                        // const sortedArray = newUpdateData.sort(
                        //     (a, b) =>
                        //         intialMealData.indexOf(a) -
                        //         intialMealData.indexOf(b)
                        // );
                        // console.log("sortedArray", sortedArray);
                        // handleSelectMeal(
                        //     sortedArray.length === 0
                        //         ? intialMealData
                        //         : sortedArray
                        // );
                        
                    }}
                />
            </View>
        </View>
    );
};

export default SelectMeal;
