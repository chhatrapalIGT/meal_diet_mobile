import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import CommonButton from "./Core/CommonButton";
import COLORS from "../constants/colors";

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
    selectedMeal = [],
}) => {
    const mealData =
        selectedMeal.length === 0
            ? [
                  "Breakfast",
                  "Morning snack",
                  "Lunch",
                  "Afternoon snack",
                  "Dinner",
              ]
            : selectedMeal;
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
                            ? "Which meals do you usually have?"
                            : "Selected Meals"}
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
                                            handleMealButtonPress(meal)
                                        }
                                        style={{
                                            ...styles.selectMealMainView,
                                            backgroundColor:
                                                selectedFoodGroupList.includes(
                                                    meal
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
                                                    meal
                                                )
                                                    ? COLORS.white
                                                    : COLORS.greyText,
                                            }}
                                        >
                                            {meal}
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
                                            {meal}
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
                }}
            >
                <CommonButton
                    btnTitle="Next"
                    onPress={() => {
                        handleSelectMeal(
                            selectedMeal.length === 0
                                ? selectedFoodGroupList
                                : selectedMeal
                        );
                        setSelectedFoodGroupList([]);
                    }}
                />
            </View>
        </View>
    );
};

export default SelectMeal;
