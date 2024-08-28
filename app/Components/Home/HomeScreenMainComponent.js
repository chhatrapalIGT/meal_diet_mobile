import React from "react";
import { View, Pressable, ScrollView, Text, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { images } from "../../Resource/Images";
import COLORS from "../../constants/colors";

const HomeScreenMainComponent = ({
    handleDateNavigation,
    selectedDate,
    mealList,
    handleMealDetailsForRecipe = () => {},
}) => {
    return (
        <View style={{ height: hp(100) }}>
            <View
                style={{
                    flex: 0.5,
                    justifyContent: "center",
                    backgroundColor: "#CBF0F2",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                    elevation: 1,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 25,
                    }}
                >
                    <Pressable
                        onPress={() => handleDateNavigation("yesterday")}
                    >
                        <Image
                            source={images.backIcon}
                            style={{ width: 28, height: 24 }}
                        />
                    </Pressable>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: "Inter_600SemiBold",
                                color: COLORS.greyText,
                            }}
                        >
                            Today
                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                                fontFamily: "Inter_400Regular",
                                color: COLORS.greyText,
                            }}
                        >
                            {selectedDate.toDateString()}
                        </Text>
                    </View>
                    <Pressable onPress={() => handleDateNavigation("tomorrow")}>
                        <Image
                            source={images.forwordIcon}
                            style={{ width: 28, height: 24 }}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={{ flex: 5.5 }}>
                <ScrollView style={{ marginBottom: 63 }}>
                    <View
                        style={{
                            marginHorizontal: wp(7.69),
                            marginTop: hp(3.81),
                        }}
                    >
                        {mealList.map((meal, index) => {
                            return (
                                <View
                                    key={`meal_${index}`}
                                    style={{
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: hp(3.55),
                                    }}
                                >
                                    <View style={{ flex: 4 }}>
                                        <View
                                            style={{
                                                marginLeft: wp(5.89),
                                                marginTop: hp(1.06),
                                                marginBottom: hp(2.48),
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color:
                                                        index % 2 === 0
                                                            ? "#085A5F"
                                                            : "#6ED2D9",
                                                    fontSize: 18,
                                                    fontFamily:
                                                        "Inter_600SemiBold",
                                                }}
                                            >
                                                {meal.Meal}
                                            </Text>
                                            <View
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderBottomColor:
                                                        "#E2DDDD",
                                                    width: "100%",
                                                    marginTop: hp(0.35),
                                                }}
                                            />
                                            {meal.Items.map(
                                                (item, itemIndex) => {
                                                    return (
                                                        <>
                                                            {item.Type ===
                                                                "Food item" && (
                                                                <Text
                                                                    style={{
                                                                        marginTop:
                                                                            hp(
                                                                                1.3
                                                                            ),
                                                                        color: COLORS.greyText,
                                                                        fontSize: 14,
                                                                        fontFamily:
                                                                            "Inter_500Medium",
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </Text>
                                                            )}
                                                            {item.Type ===
                                                                "Recipe" && (
                                                                <View
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            marginTop:
                                                                                hp(
                                                                                    1.3
                                                                                ),
                                                                            color: COLORS.greyText,
                                                                            fontSize: 14,
                                                                            fontFamily:
                                                                                "Inter_500Medium",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Text>
                                                                    <Pressable
                                                                        onPress={() =>
                                                                            handleMealDetailsForRecipe(
                                                                                meal.Meal, item
                                                                            )
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={{
                                                                                marginTop:
                                                                                    hp(
                                                                                        1.77
                                                                                    ),
                                                                                color: COLORS.primaryNew,
                                                                                fontSize: 10,
                                                                                fontFamily:
                                                                                    "Inter_500Medium",
                                                                            }}
                                                                        >
                                                                            {`Read more and see other options->`}
                                                                        </Text>
                                                                    </Pressable>
                                                                </View>
                                                            )}
                                                        </>
                                                    );
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,
                                            overflow: "hidden",
                                            height: wp(28.2),
                                            width: wp(28.12),
                                            borderTopRightRadius: 10,
                                        }}
                                    >
                                        <Image
                                            source={images.foodImage}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                position: "absolute",
                                                top: -hp(2.25),
                                                right: -wp(4.1),
                                            }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreenMainComponent;
