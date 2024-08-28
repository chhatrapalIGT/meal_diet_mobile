import React, { useState } from "react";
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    ImageBackground,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { images } from "../../Resource/Images";
import { SafeAreaView } from "react-native";
import COLORS from "../../constants/colors";
import GenderComponent from "../../Components/GenderComponent";
import SelectMeal from "../../Components/SelectMeal";
import { useNavigation, useRoute } from "@react-navigation/native";
import TermsAndCondition from "../../Components/TermsAndCondition";
import { getUrl } from "../../Network/url";
import { post } from "../../Network/request";
import showToast from "../../Components/Core/CustomTost";
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
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

const SignupSteps = () => {
    const { navigate } = useNavigation();
    const route = useRoute();
    const { userData } = route.params || "";
    const [activeSlide, setActiveSlide] = useState(0);
    const [stepsSignupData, setStepsSignupData] = useState({
        gender: "",
        selectedMeals: [],
        isTermAndCondition: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const stepsData = [
        {
            id: 1,
            component: (
                <GenderComponent
                    handleSelectGender={(gender) => {
                        setActiveSlide(1);
                        setStepsSignupData({
                            ...stepsSignupData,
                            gender: gender,
                        });
                    }}
                />
            ),
        },
        {
            id: 2,
            component: (
                <SelectMeal
                    handleSelectMeal={(selectedMeals) => {
                        setStepsSignupData({
                            ...stepsSignupData,
                            selectedMeals: selectedMeals,
                        });
                        setActiveSlide(2);
                    }}
                />
            ),
        },
        {
            id: 3,
            component: (
                <TermsAndCondition
                    isLoading={isLoading}
                    handleTermsAndCondition={async (value) => {
                        setStepsSignupData({
                            ...stepsSignupData,
                            isTermAndCondition: value,
                        });
                        try {
                            setIsLoading(true);
                            const payload = {
                                ...userData,
                                gender: stepsSignupData.gender,
                                termsAndConditions: value,
                            };
                            const url = getUrl("register");
                            const res = await post(url, payload);
                            const { success, message, data } = res;
                            if (success) {
                                setIsLoading(false);
                                await AsyncStorage.setItem(
                                    "userToken",
                                    JSON.stringify(data.authToken)
                                );
                                showToast("success", message);
                                setTimeout(() => {
                                    navigate("HomeTabs", {
                                        screen: "Planner",
                                        params: {
                                            selectedItems:
                                                stepsSignupData.selectedMeals,
                                        },
                                    });
                                }, 1000);
                            } else {
                                setIsLoading(false);
                                showToast("error", message);
                            }
                        } catch (error) {
                            setIsLoading(false);
                            showToast("error", "Internal server error.");
                        }
                    }}
                    mainContainerStyle={{
                        marginTop: hp(21.56),
                    }}
                    mainContentStyle={{ flex: 4}}
                    mainFooterStyle={{ flex: 2 }}
                />
            ),
        },
    ];

    return (
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <ImageBackground
                source={images.signupBGImage} // Use the imported image here
                resizeMode="stretch"
                style={styles.welComeBgImg}
            >
                <View style={styles.container}>
                    <View style={{ flex: 5.5, width: "100%" }}>
                        {stepsData.map((step, index) => {
                            return (
                                <>
                                    {activeSlide === index && (
                                        <View
                                            style={{ flex: 1 }}
                                            key={`render-component${step.id}`}
                                        >
                                            {activeSlide === index
                                                ? step.component
                                                : null}
                                        </View>
                                    )}
                                </>
                            );
                        })}
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <View
                            style={{
                                marginTop: hp(4.85),
                                marginBottom: hp(4.38),
                                display: "flex",
                                flexDirection: "row",
                                gap: 25,
                            }}
                        >
                            {stepsData.map((_, index) => {
                                return (
                                    <View
                                        key={`dot-${index}`}
                                        style={{
                                            ...styles.dot,
                                            backgroundColor:
                                                activeSlide === index
                                                    ? COLORS.active
                                                    : COLORS.white,
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SignupSteps;
