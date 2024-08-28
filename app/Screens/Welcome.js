import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../Resource/Images";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

import CommonButton from "../Components/Core/CommonButton";

import COLORS from "../constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommonBottomSheetComponent from "../Components/Core/CommonBottomSheetComponent";
import LoginComponent from "../Components/LoginComponent";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768 && screenHeight >= 768;
const styles = StyleSheet.create({
    mainWelcomeContainer: { flex: 1 },
    welComeBgImg: {
        height: screenHeight,
        width: screenWidth,
        alignItems: "center",
    },
    middleContentMainView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: isTablet ? 4 : 4.4,
    },
    logoIconView: {
        height: isTablet ? wp(19) : wp(31),
        width: isTablet ? wp(15.62) : wp(25.55),
    },
    logoImg: {
        height: "100%",
        width: "100%",
    },
    appTitleText: {
        textAlign: "center",
        fontSize: RFPercentage(5.3),
        fontFamily: "PaytoneOne_400Regular",
        color: COLORS.greyText,
    },
    appSubTitleText: {
        textAlign: "center",
        fontSize: RFPercentage(2.9),
        fontFamily: "Inter_300Light",
        color: COLORS.greyText,
    },
    bottomContent: {
        width: "100%",
        flex: isTablet ? 2 : 1.6,
    },
    SignupButtonView: {
        backgroundColor: COLORS.white,
        marginTop: hp(3.45),
    },
    signupText: {
        color: COLORS.primaryNew,
    },
    termsAndConditionView: { marginHorizontal: wp(10.4), marginTop: hp(2.05) },
    termsAndConditionText1: {
        fontSize: RFPercentage(1.2),
        fontFamily: "Inter_500Medium",
        color: COLORS.greyText,
    },
    termsAndConditionText2: {
        textDecorationLine: "underline",
        fontSize: RFPercentage(1.2),
        fontFamily: "Inter_500Medium",
        color: COLORS.primaryNew,
    },
});
const Welcome = () => {
    const { navigate } = useNavigation();
    const sheetRef = useRef(null);

    const handleSnapPress = useCallback((index) => {
        sheetRef?.current?.snapToIndex(index);
    }, []);

    const handleRedirect = async () => {
        const authToken = JSON.parse(await AsyncStorage.getItem("userToken"));
        if (authToken) {
            navigate("MealListing");
        }
    };
    useEffect(() => {
        handleRedirect();
    }, []);

    return (
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ImageBackground
                    source={images.welcomeBGImage} // Use the imported image here
                    resizeMode="stretch"
                    style={styles.welComeBgImg}
                >
                    <View style={{ height: hp(100) }}>
                        <View style={styles.middleContentMainView}>
                            <View style={styles.logoIconView}>
                                <Image
                                    source={images.logo}
                                    resizeMode="cover"
                                    style={styles.logoImg}
                                />
                            </View>
                            <View>
                                <Text style={styles.appTitleText}>
                                    Mind Diet
                                </Text>
                                <Text style={styles.appSubTitleText}>
                                    Start your health journey now
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bottomContent}>
                            <CommonButton
                                btnTitle="Login"
                                onPress={() => handleSnapPress(0)}
                            />
                            <CommonButton
                                btnTitle="Sign up"
                                onPress={() => navigate("Signup")}
                                btnContainerStyle={styles.SignupButtonView}
                                btnTextStyle={styles.signupText}
                            />
                            <View style={styles.termsAndConditionView}>
                                <Text style={styles.termsAndConditionText1}>
                                    When signing up and using this app you will
                                    need to agree to our
                                </Text>
                                <Pressable
                                    onPress={() => {
                                        navigate("TermsAndConditions");
                                    }}
                                >
                                    <Text style={styles.termsAndConditionText2}>
                                        Terms and conditions
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <CommonBottomSheetComponent ref={sheetRef}>
                        <LoginComponent
                            handleCloseSlider={() => {
                                sheetRef.current?.close();
                            }}
                        />
                    </CommonBottomSheetComponent>
                </ImageBackground>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

export default Welcome;
