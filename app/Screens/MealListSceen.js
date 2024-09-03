import React, { useCallback } from "react";
import { Dimensions, StyleSheet } from "react-native";
import SelectMeal from "../Components/SelectMeal";
import { SafeAreaView } from "react-native";
import { ImageBackground } from "react-native";
import { images } from "../Resource/Images";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    mainWelcomeContainer: { flex: 1 },
    welComeBgImg: {
        height: screenHeight,
        width: screenWidth,
    },
    container: {
        flex: 1,
        width: wp(100),
        alignItems: "center",
    },
});

const MealListSceen = () => {
    const { navigate } = useNavigation();
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
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <ImageBackground
                source={images.signupBGImage}
                resizeMode="stretch"
                style={styles.welComeBgImg}
            >
                <SelectMeal
                    mainContainerStyle={{
                        marginTop: hp(5),
                        marginBottom: hp(3),
                    }}
                    mainFooterStyle={{
                        justifyContent: "center",
                    }}
                    handleSelectMeal={(selectedMeals) => {
                        navigate("SelectedMealListing", {
                            selectedMeals,
                        });
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

export default MealListSceen;
