import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../constants/colors";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BackHandler } from "react-native";

const MealSelectionPage = () => {
    const navigation = useNavigation();
    const foodgroupList = [
        "Breakfast",
        "Morning snack",
        "Lunch",
        "Afternoon snack",
        "Dinner",
    ];

    // Initialize state to keep track of selected items for each meal
    const [selectedFoodGroupList, setSelectedFoodGroupList] = useState([]);
    const [selectedMealsError, setSelectedMealsError] = useState("");

    // Function to navigate to the next page with accumulated selected items
    const navigateToSelectedMealsPage = () => {
        if (selectedFoodGroupList.length > 0) {
            setSelectedMealsError("");
            navigation.navigate("SelectedMealsPage", {
                selectedItems: selectedFoodGroupList,
            });
        } else {
            setSelectedMealsError("Please select any one meal");
        }
    };

    // Function to update selected items for a specific meal
    const handleMealButtonPress = (meal) => {
        setSelectedMealsError("");
        if (selectedFoodGroupList.includes(meal)) {
            const filterData = selectedFoodGroupList.filter(
                (item) => item !== meal
            );
            setSelectedFoodGroupList(filterData);
        } else {
            setSelectedFoodGroupList([...selectedFoodGroupList, meal]);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                BackHandler.exitApp();
                return true; // Prevent default back action
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])
    );
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ marginHorizontal: wp(5.7), marginTop: 30 }}>
                <Text style={styles.title}>
                    Which meals do you usually have?
                </Text>
                <Text style={styles.subtitle}>Select the meals you have</Text>

                {foodgroupList.map((meal, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.mealButton,
                            {
                                backgroundColor: selectedFoodGroupList.includes(
                                    meal
                                )
                                    ? "blue"
                                    : "transparent",
                            },
                        ]}
                        onPress={() => handleMealButtonPress(meal)}
                    >
                        <Text style={styles.mealButtonText}>{meal}</Text>
                    </TouchableOpacity>
                ))}
                {selectedMealsError && (
                    <Text
                        style={{
                            color: COLORS.error,
                            fontSize: RFPercentage(1.6),
                        }}
                    >
                        {selectedMealsError}
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={navigateToSelectedMealsPage}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    mealButton: {
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    mealButtonText: {
        fontSize: 18,
        color: "black",
    },
    nextButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
});

export default MealSelectionPage;
