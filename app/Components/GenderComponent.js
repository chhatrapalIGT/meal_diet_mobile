import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import CommonButton from "./Core/CommonButton";
import COLORS from "../constants/colors";
import { Image } from "react-native";
import { images } from "../Resource/Images";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { translations } from "../Language";

const styles = StyleSheet.create({
    genderContainer: { flex: 1 },
    genderMainContent: {
        flex: 4.6,
        paddingBottom: hp(5.21),
        marginHorizontal: wp(9.23),
        marginTop: hp(21.56),
    },
    genderFooter: {
        flex: 1.4,
        justifyContent: "flex-end",
    },
    genderTitleView: { marginBottom: hp(2.72) },
    genderTitleText: {
        fontSize: RFPercentage(2.9),
        color: COLORS.black,
        fontFamily: "Inter_300Light",
    },
    // genderSubTitleView: { marginBottom: hp(11.25) },
    genderSubTitleView: { marginBottom: hp(5) },

    genderSubTitleText: {
        fontSize: RFPercentage(1.8),
        color: COLORS.black,
        fontFamily: "Inter_500Medium",
    },
    genderButtonMainView: {
        backgroundColor: COLORS.white,
        flex: 3,
        paddingVertical: hp(4.73),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    genderBtmText: {
        fontSize: RFPercentage(2.4),
        fontFamily: "Inter_700Bold",
    },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
        fontFamily: "Inter_500Medium",
    },
});
const GenderComponent = ({ handleSelectGender }) => {
 const currentLanguage = useSelector((state) => state.language.language);

    const [gender, setGender] = useState("");
    const [genderError, setGenderError] = useState("");

    const GenderButton = ({
        handleOnPress,
        title,
        genderImg,
        btnWapperStyle,
        titleStyle,
        imgStyle,
    }) => {
        return (
            <TouchableOpacity
                onPress={handleOnPress}
                style={{
                    ...styles.genderButtonMainView,
                    ...btnWapperStyle,
                }}
            >
                <Text
                    style={{
                        ...styles.genderBtmText,
                        ...titleStyle,
                    }}
                >
                    {title}
                </Text>
                <Image
                    source={genderImg}
                    style={{
                        width: 22,
                        height: 34,
                        marginTop: hp(0.2),
                        ...imgStyle,
                    }}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.genderContainer}>
            <View style={styles.genderMainContent}>
                <View style={styles.genderTitleView}>
                    <Text style={styles.genderTitleText}>
                        {translations[currentLanguage].whatIsYourSexAtBirth}
                        {/* What’s your gender of birth?{" "} */}
                    </Text>
                </View>
                <View style={styles.genderSubTitleView}>
                    <Text style={styles.genderSubTitleText}>
                        {translations[currentLanguage].whatIsYourSexAtBirthParagraph}

                        {/* (a short paragraph explaining why this is relevant to
                        ask..) */}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 15,
                        marginBottom: genderError !== "" ? 10 : 0,
                    }}
                >
                    <GenderButton
                        handleOnPress={() => {
                            setGender("Female");
                            setGenderError("");
                        }}
                        title={translations[currentLanguage].female}
                        genderImg={
                            gender === "Female"
                                ? images.activeFemaleSymbol
                                : images.femaleSymbol
                        }
                        btnWapperStyle={{
                            backgroundColor:
                                gender === "Female"
                                    ? COLORS.active
                                    : COLORS.white,
                        }}
                        imgStyle={{
                            width: wp(5.64),
                            height: wp(8.71),
                            marginTop: hp(0.2),
                        }}
                        titleStyle={{
                            color:
                                gender === "Female"
                                    ? COLORS.white
                                    : COLORS.greyText,
                        }}
                    />
                    <GenderButton
                        handleOnPress={() => {
                            setGender("Male");
                            setGenderError("");
                        }}
                        title={translations[currentLanguage].male}
                        genderImg={
                            gender === "Male"
                                ? images.activeMaleSymbol
                                : images.maleSymbol
                        }
                        btnWapperStyle={{
                            backgroundColor:
                                gender === "Male"
                                    ? COLORS.active
                                    : COLORS.white,
                        }}
                        imgStyle={{
                            width: wp(7.43),
                            height: wp(7.95),
                            marginTop: hp(0.2),
                        }}
                        titleStyle={{
                            color:
                                gender === "Male"
                                    ? COLORS.white
                                    : COLORS.greyText,
                        }}
                    />
                </View>
                {genderError && (
                    <Text style={styles.errorText}>{genderError}</Text>
                )}
            </View>
            <View style={styles.genderFooter}>
                <CommonButton
                    btnTitle={translations[currentLanguage].next}
                    onPress={() => {
                        if (gender === "") {
                            setGenderError(translations[currentLanguage].genederIsRequired)
                        } else {
                            setGenderError("");
                            handleSelectGender(gender);
                        }
                    }}
                    // disabled={isLoading}
                />
            </View>
        </View>
    );
};

export default GenderComponent;
