import React from "react";
import { Dimensions, StyleSheet, ImageBackground } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TermsAndCondition from "../Components/TermsAndCondition";
import { images } from "../Resource/Images";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    mainWelcomeContainer: { flex: 1 },
    welComeBgImg: {
        height: screenHeight,
        width: screenWidth,
    },
});

const TermsAndConditionScreen = () => {
    const { goBack } = useNavigation();

    return (
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <ImageBackground
                source={images.signupBGImage}
                resizeMode="stretch"
                style={styles.welComeBgImg}
            >
                <TermsAndCondition
                    mainContainerStyle={{
                        marginTop: hp(5),
                        marginBottom: hp(3),
                    }}
                    handleTermsAndCondition={() => {
                        goBack();
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

export default TermsAndConditionScreen;
