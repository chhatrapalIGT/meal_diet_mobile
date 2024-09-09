import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { images } from "../Resource/Images";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";
import { Modal } from "react-native";
import SOSComponent from "../Components/Home/SOSComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreenMainComponent from "../Components/Home/HomeScreenMainComponent";
import { ActivityIndicator } from "react-native";
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
const SOSScreen = () => {
    const { navigate } = useNavigation();
    const [mealList, setMealList] = useState([]);
    const [selectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [isShowSOSModal, setIsShowSOSModal] = useState(false);

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
        const selectedMeals = JSON.parse(
            await AsyncStorage.getItem("selectedMeal")
        );
        const updatedSelectedItems = selectedMeals.map((item) => item);
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
    const handleCloseSOS = async () => {
        const selectedMeals = JSON.parse(
            await AsyncStorage.getItem("selectedMeal")
        );
        setIsShowSOSModal(false);
        navigate("HomeTabs", {
            screen: "Planner",
            params: {
                selectedItems: selectedMeals,
            },
        });
    };

    useEffect(() => {
        getDaywiseFoodgroup();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            setIsShowSOSModal(true);
        }, [])
    );
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
                            handleDateNavigation={() => {}}
                            selectedDate={selectedDate}
                            mealList={mealList}
                        />
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isShowSOSModal}
                        onRequestClose={handleCloseSOS}
                    >
                        <SOSComponent handleClose={handleCloseSOS} />
                    </Modal>
                </ImageBackground>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

export default SOSScreen;
