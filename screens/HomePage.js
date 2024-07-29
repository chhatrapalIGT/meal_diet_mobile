import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Overlay } from "react-native-elements";
import COLORS from "../constants/colors";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";

const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        position: "top",
    });
};

const HomePage = ({ route }) => {
    const { navigate } = useNavigation();
    const { selectedItems } = route.params;
    const [mealList, setMealList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const navigateToPage = (page) => {
        navigate(page);
        closeMenu(); // Close the menu after navigation
    };

    const handleDateNavigation = (direction) => {
        const newDate = new Date(selectedDate);
        if (direction === "yesterday") {
            newDate.setDate(selectedDate.getDate() - 1);
        } else if (direction === "tomorrow") {
            newDate.setDate(selectedDate.getDate() + 1);
        }
        setSelectedDate(newDate);
        // Here you can add logic to navigate to the corresponding date
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
            const { success,data, message } = res;
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
    useEffect(() => {
        getDaywiseFoodgroup();
    }, [selectedDate]);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>My Weekly Plan</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity
                            onPress={() => handleDateNavigation("yesterday")}
                        >
                            <Text
                                style={[
                                    styles.navigationText,
                                    { color: "#0000FF" },
                                ]}
                            >
                                Yesterday
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.dateText}>
                            {selectedDate.toDateString()}
                        </Text>
                        <TouchableOpacity
                            onPress={() => handleDateNavigation("tomorrow")}
                        >
                            <Text
                                style={[
                                    styles.navigationText,
                                    { color: "#0000FF" },
                                ]}
                            >
                                Tomorrow
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.mealContainer}>
                            {mealList.map((meal, index) => (
                                <View key={index} style={styles.mealItem}>
                                    <View style={styles.mealInfoContainer}>
                                        <View style={styles.mealTextContainer}>
                                            <Text style={styles.mealText}>
                                                {meal.Meal}
                                            </Text>
                                            {meal.Items.map(
                                                (item, itemIndex) => {
                                                    return (
                                                        <>
                                                            {item.Type ===
                                                                "Food item" && (
                                                                <View
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "row",
                                                                        alignItems:
                                                                            "center",
                                                                        marginTop: 10,
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.descriptionText
                                                                        }
                                                                    >
                                                                        {`${
                                                                            item.name
                                                                        } - ${
                                                                            item.quantity ||
                                                                            ""
                                                                        }`}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                            {item.Type ===
                                                                "Recipe" && (
                                                                <View
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    style={{
                                                                        marginTop: 10,
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.descriptionText
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Text>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            navigate(
                                                                                "MealDetailsPage",
                                                                                {
                                                                                    meal,
                                                                                    selectedItems,
                                                                                    selectedRecipe:
                                                                                        item,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.optionsText
                                                                            }
                                                                        >
                                                                            {`Read more ->`}{" "}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )}
                                                        </>
                                                    );
                                                }
                                            )}
                                        </View>
                                        <Image
                                            source={require("../assets/icon.png")}
                                            style={styles.mealImage}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            )}
            <View style={styles.bottomIconsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon
                        name="settings"
                        size={30}
                        color="black"
                        onPress={openMenu}
                    />
                    <Text style={styles.iconLabel}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="description" size={30} color="black" />
                    <Text style={styles.iconLabel}>Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon
                        name="apple"
                        type="font-awesome-5"
                        size={30}
                        color="black"
                    />
                    <Text style={styles.iconLabel}>Meal</Text>
                </TouchableOpacity>
            </View>
            <Overlay isVisible={isMenuVisible} onBackdropPress={closeMenu}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigateToPage("Signup")}
                    >
                        <Text>Account Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigateToPage("MealSelectionPage")}
                    >
                        <Text>Meal Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigateToPage("TermsAndConditions")}
                    >
                        <Text>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigateToPage("ChangePassowrd")}
                    >
                        <Text>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            AsyncStorage.removeItem("userToken");
                            closeMenu();
                            navigate("Login");
                        }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#f0f0f0",
    },
    headerText: {
        fontSize: 25,
        textAlign: "center",
        flex: 1,
    },
    headerIcon: {
        width: 30,
        height: 30,
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    dayContainer: {
        alignItems: "center",
    },
    dayText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    dateText: {
        fontSize: 15,
    },
    calendar: {
        marginBottom: 30,
    },
    mealContainer: {
        paddingVertical: 10,
    },
    mealItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    mealInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mealTextContainer: {
        flex: 1,
    },
    mealText: {
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    descriptionText: {
        fontSize: 18,
        // marginTop: 8,
    },
    optionsText: {
        fontSize: 18,
        color: "blue",
        textDecorationLine: "underline",
        // paddingLeft: "20px",
    },
    mealImage: {
        width: 150,
        height: 150,
        resizeMode: "cover",
    },
    nextButton: {
        backgroundColor: "blue",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "center",
        marginVertical: 10,
    },
    nextButtonText: {
        color: "white",
        fontSize: 16,
    },
    dateButton: {
        alignItems: "center",
    },
    circleDate: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFA500", // You can customize the color
    },
    selectedDateButton: {
        backgroundColor: "#0000FF", // You can customize the color for the selected date
    },
    dateButtonText: {
        fontSize: 20,
    },
    navigationText: {
        fontSize: 18, // Adjust the size as needed
        marginHorizontal: 5,
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

export default HomePage;
