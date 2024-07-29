import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealDetailsPage = ({ route }) => {
    const { meal, selectedItems, selectedRecipe } = route.params;
    return (
        <View style={styles.container}>
            {selectedRecipe ? (
                <>
                    <Text style={styles.title}>{meal.Meal}</Text>
                    <ScrollView>
                        <Image
                            source={require("../assets/icon.png")}
                            style={{
                                width: 200,
                                height: 200,
                                alignSelf: "center",
                            }}
                        />
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>
                                {selectedRecipe.name}
                            </Text>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "700",
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#007260",
                                        color: "#007260",
                                    }}
                                >
                                    Ingredients:
                                </Text>
                                {selectedRecipe["Recipe Ingredients"]
                                    .split(",")
                                    .map((ing, index) => {
                                        return (
                                            <View style={{ marginTop: 10 }} key={index}>
                                                {index > 0 && (
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: "500",
                                                            paddingTop: 5,
                                                        }}
                                                    >{`${index}) ${ing}`}</Text>
                                                )}
                                            </View>
                                        );
                                    })}
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "700",
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#007260",
                                        color: "#007260",
                                    }}
                                >
                                    Recipe:
                                </Text>
                                {selectedRecipe["Recipe instructions"]
                                    .split(",")
                                    .map((ing, index) => {
                                        return (
                                            <View style={{ marginTop: 10 }} key={index}>
                                                {index > 0 && (
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: "500",
                                                            paddingTop: 5,
                                                        }}
                                                    >{`Step-${index} ${ing}`}</Text>
                                                )}
                                            </View>
                                        );
                                    })}
                            </View>
                        </View>
                    </ScrollView>
                </>
            ) : (
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>No Data found of this meal</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0FFFF", // Light blue background color
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    navigationText: {
        fontSize: 16,
        color: "blue",
    },
    mealOptionsContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    mealOption: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: "#E0FFFF",
        marginRight: 10,
    },
    mealOptionText: {
        fontSize: 16,
        color: "black",
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        alignSelf: "center", // Align title to center
    },
    contentContainer: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        padding: 30,
    },
    ingredientsContainer: {
        padding: 10,
    },
    swipeButton: {
        alignItems: "center",
        marginVertical: 20,
    },
    swipeButtonText: {
        fontSize: 18,
        color: "blue",
    },
    bottomIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
    },
    iconButton: {
        alignItems: "center",
    },
    menuContainer: {
        padding: 20,
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default MealDetailsPage;
