import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { ImageBackground } from "react-native";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SelectMeal from "../Components/SelectMeal";
import { images } from "../Resource/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const SelectedMealListSceen = () => {
    const routes = useRoute();
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <ImageBackground
                source={images.signupBGImage}
                resizeMode="stretch"
                style={styles.welComeBgImg}
            >
                <SelectMeal
                    selectedMeal={routes.params.selectedMeals}
                    mainContainerStyle={{
                        marginTop: hp(5),
                        marginBottom: hp(3),
                    }}
                    mainFooterStyle={{
                        justifyContent: "center",
                    }}
                    handleSelectMeal={(selectedMeals) => {
                        navigate("HomeTabs", {
                            screen: "Planner",
                            params: {
                                selectedItems: selectedMeals,
                            },
                        });
                        AsyncStorage.setItem(
                            "selectedMeal",
                            JSON.stringify(selectedMeals)
                        );
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SelectedMealListSceen;
