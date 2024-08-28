import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../constants/colors";

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
        <View
            style={{
                width: "100%",
            }}
        >
            <View
                style={{
                    backgroundColor: COLORS.white,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                    elevation: 2,
                }}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{
                        paddingLeft: 6,
                    }}
                >
                    {selectedMealsData.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSetSelectedMeal(index)}
                            style={[
                                {
                                    marginRight: 26,
                                },
                                activeTab === index && {
                                    borderBottomColor: COLORS.primaryNew,
                                    borderBottomWidth: 4,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    {
                                        color: "#085A5F",
                                        fontSize: 18,
                                        fontFamily: "Inter_300Light",
                                        paddingLeft: 4,
                                        paddingRight: 7,
                                    },
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View
                style={{
                    marginTop: 78,
                    paddingRight: 43,
                    paddingLeft: 27,
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            color: COLORS.greyText,
                            fontSize: 22,
                            fontFamily: "Inter_600SemiBold",
                        }}
                    >
                        {selectedRecipe?.name}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 7,
                        marginTop: 14,
                    }}
                >
                    {recipeTab.map((data, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => handleSelectedRecipeTab(index)}
                                style={{
                                    backgroundColor:
                                        selectedMealTab === data
                                            ? "#FBB03F"
                                            : "rgba(255, 153, 0, 0.22)",
                                    borderRadius: 3,
                                    paddingVertical: 7,
                                    width: "30%",
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            selectedMealTab === data
                                                ? COLORS.white
                                                : COLORS.greyText,
                                        fontSize: 14,
                                        fontFamily: "Inter_600SemiBold",
                                        textAlign: "center",
                                    }}
                                >
                                    {data}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#E2DDDD",
                            marginTop: 32,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.black,
                                fontSize: 18,
                                fontFamily: "Inter_300Light",
                                paddingBottom: 7,
                            }}
                        >
                            {selectedMealTab}
                        </Text>
                    </View>
                    {selectedMealTab === "Description" && (
                        <View
                            style={{
                                marginTop: 11,
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.greyText,
                                    fontSize: 14,
                                    fontFamily: "Inter_400Regular",
                                }}
                            >
                                {/* A description of the recipe.{" "} */}A
                                description Data Not Found
                            </Text>
                        </View>
                    )}
                    {selectedMealTab === "Recipe" && (
                        <View
                            style={{
                                marginTop: 11,
                            }}
                        >
                            {selectedRecipe["Recipe instructions"]
                                .split(",")
                                .map((ing, index) => {
                                    return (
                                        <View key={index}>
                                            {index > 0 && (
                                                <Text
                                                    style={{
                                                        color: COLORS.greyText,
                                                        fontSize: 14,
                                                        fontFamily:
                                                            "Inter_500Medium",
                                                        lineHeight: 20,
                                                        paddingBottom: 20,
                                                    }}
                                                >
                                                    {`Step-${index}`}
                                                    <Text
                                                        style={{
                                                            color: COLORS.greyText,
                                                            fontSize: 14,
                                                            fontFamily:
                                                                "Inter_500Medium",
                                                            lineHeight: 20,
                                                            paddingBottom: 20,
                                                        }}
                                                    >{`${ing}`}</Text>
                                                </Text>
                                            )}
                                        </View>
                                    );
                                })}
                        </View>
                    )}
                    {selectedMealTab === "Ingredients" && (
                        <ScrollView
                            style={{
                                marginTop: 11,
                            }}
                        >
                            {selectedRecipe["Recipe Ingredients"]
                                .split(":")[1]
                                .split(",")
                                .map((ing, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.greyText,
                                                    fontSize: 14,
                                                    fontFamily:
                                                        "Inter_500Medium",
                                                    lineHeight: 20,
                                                    paddingBottom: 20,
                                                }}
                                            >{`${ing}`}</Text>
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        "rgba(39, 211, 222, 0.3)",
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    borderColor: "#3F3F3F",
                                                    borderWidth: 0.5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    ---
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    );
};

export default MealDetailsComponent;
