import React from "react";
import { View, Pressable, ScrollView, Text, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { images } from "../../Resource/Images";
import COLORS from "../../constants/colors";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    homeScreenMainContainer: { height: hp(100) },
    homeHeaderMainView: {
        flex: 0.5,
        justifyContent: "center",
        backgroundColor: "#CBF0F2",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 1,
    },
    homeHeaderContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: wp(6.41),
    },
    arraowImage: {
        width: 28,
        height: 24,
    },
    headerTextView: {
        justifyContent: "center",
        alignItems: "center",
    },
    headerDayText: {
        fontSize: RFPercentage(1.8),
        fontFamily: "Inter_600SemiBold",
        color: COLORS.greyText,
    },
    headerDateText: {
        fontSize: RFPercentage(1.3),
        fontFamily: "Inter_400Regular",
        color: COLORS.greyText,
    },
    homeMainContentContainer: {
        flex: 5.5,
    },
    homeMainScrollWapper: {
        marginBottom: hp(7.46),
    },
    homeContentWapper: { marginHorizontal: wp(7.69), marginTop: hp(3.81) },
    mealListMainView: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp(3.55),
    },
    mealListLeftMainView: { flex: 4 },
    mealListLeftMainWapper: {
        marginLeft: wp(5.89),
        marginTop: hp(1.06),
        marginBottom: hp(2.48),
    },
    mealListTitle: {
        fontSize: RFPercentage(2.4),
        fontFamily: "Inter_600SemiBold",
    },
    mealListItemText: {
        marginTop: hp(1.3),
        color: COLORS.greyText,
        fontSize: RFPercentage(1.8),
        fontFamily: "Inter_500Medium",
    },
    mealListItemReadMore: {
        marginTop: hp(1.77),
        color: COLORS.primaryNew,
        fontSize: RFPercentage(1.3),
        fontFamily: "Inter_500Medium",
    },
    mealListRightView: {
        flex: 2,
        overflow: "hidden",
        height: wp(28.2),
        width: wp(28.12),
        borderTopRightRadius: 10,
    },
    mealListRightImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: -hp(2.25),
        right: -wp(4.1),
    },
    borderLine: {
        borderBottomWidth: 1,
        borderBottomColor: "#E2DDDD",
        width: "100%",
        marginTop: hp(0.35),
    },
});

const HomeScreenMainComponent = ({
    handleDateNavigation,
    selectedDate,
    mealList,
    handleMealDetailsForRecipe = () => {},
    daysbuttonDisabled = false,
}) => {
    return (
        <View style={styles.homeScreenMainContainer}>
            <View style={styles.homeHeaderMainView}>
                <View style={styles.homeHeaderContent}>
                    <Pressable
                        disabled={daysbuttonDisabled}
                        onPress={() => handleDateNavigation("yesterday")}
                    >
                        <Image
                            source={images.backIcon}
                            style={styles.arraowImage}
                        />
                    </Pressable>
                    <View style={styles.headerTextView}>
                        <Text style={styles.headerDayText}>
                            {selectedDate.toDateString()}
                        </Text>
                        <Text style={styles.headerDateText}>
                            {selectedDate.toDateString() ===
                            new Date().toDateString()
                                ? "Today"
                                : ""}
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => handleDateNavigation("tomorrow")}
                        disabled={daysbuttonDisabled}
                    >
                        <Image
                            source={images.forwordIcon}
                            style={styles.arraowImage}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={styles.homeMainContentContainer}>
                <ScrollView style={styles.homeMainScrollWapper}>
                    <View style={styles.homeContentWapper}>
                        {mealList.length > 0 ? (
                            <>
                                {mealList.map((meal, index) => {
                                    return (
                                        <View
                                            key={`meal_${index}`}
                                            style={styles.mealListMainView}
                                        >
                                            <View
                                                style={
                                                    styles.mealListLeftMainView
                                                }
                                            >
                                                <View
                                                    style={
                                                        styles.mealListLeftMainWapper
                                                    }
                                                >
                                                    <Text
                                                        style={{
                                                            color:
                                                                index % 2 === 0
                                                                    ? "#085A5F"
                                                                    : "#6ED2D9",
                                                            ...styles.mealListTitle,
                                                        }}
                                                    >
                                                        {meal.Meal}
                                                    </Text>
                                                    <View
                                                        style={
                                                            styles.borderLine
                                                        }
                                                    />
                                                    {meal.Items.map(
                                                        (item, itemIndex) => {
                                                            return (
                                                                <>
                                                                    {item.Type ===
                                                                        "Food item" && (
                                                                        <Text
                                                                            style={
                                                                                styles.mealListItemText
                                                                            }
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
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
                                                                                style={
                                                                                    styles.mealListItemText
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </Text>
                                                                            <Pressable
                                                                                onPress={() =>
                                                                                    handleMealDetailsForRecipe(
                                                                                        meal.Meal,
                                                                                        item
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Text
                                                                                    style={
                                                                                        styles.mealListItemReadMore
                                                                                    }
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
                                                style={styles.mealListRightView}
                                            >
                                                <Image
                                                    source={images.foodImage}
                                                    style={
                                                        styles.mealListRightImage
                                                    }
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                            </>
                        ) : (
                            <View>
                                <Text
                                    style={{
                                        color: COLORS.greyText,
                                        fontSize: RFPercentage(1.8),
                                        fontFamily: "Inter_700Bold",
                                    }}
                                >
                                    Oops! It looks like this meal doesn't have a
                                    recipe yet. Try selecting another meal or
                                    check back later!
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreenMainComponent;
