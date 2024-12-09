import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";
import { ImageBackground } from "react-native";
import COLORS from "../constants/colors";
import { passwordValidation } from "../utils/validation";
import showToast from "../Components/Core/CustomTost";
import { images } from "../Resource/Images";
import CustomInput from "../Components/Core/CustomInput";
import CommonButton from "../Components/Core/CommonButton";
import { useSelector } from "react-redux";
import { translations } from "../Language";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768 && screenHeight >= 768;
const styles = StyleSheet.create({
    mainWelcomeContainer: { flex: 1 },
    welComeBgImg: {
        height: screenHeight,
        width: screenWidth,
    },
    backButtonView: {
        marginTop: hp(2.8),
        marginHorizontal: wp(6.2),
        backgroundColor: COLORS.primaryNew,
        // width: wp(17),
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal:10,
        paddingVertical:5
    },
    backBtnText: {
        fontSize: RFPercentage(2.9),
        fontFamily: "Inter_700Bold",
        color: COLORS.white,
        paddingVertical: 5,
    },
    changePassHeadingContainer: {
        marginHorizontal: wp(6.2),
    },
    changePassHeadingText: {
        fontSize: RFPercentage(2.9),
        fontFamily: "Inter_700Bold",
        marginVertical: hp(1.55),
        color: COLORS.greyText,
    },
    inputMainContainer: { marginBottom: hp(1.55), marginHorizontal: wp(6.2) },
    passwordIcon: { width: 16, height: 19, marginLeft: 4 },
    openEyeIcon: { width: 26, height: 14, marginLeft: 4 },
    closedEyeIcon: { width: 24, height: 12, marginLeft: 4 },
    signupBtn: {
        marginHorizontal: wp(6.2),
        marginBottom: 20,
    },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
    },
});
const ChangePasswordScreen = () => {
    const { goBack } = useNavigation();
    const currentLanguage = useSelector((state) => state.language.language);
    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [isOldPasswordShown, setIsOldPasswordShown] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTextInputChange = (value, type) => {
        switch (type) {
            case "oldPassword":
                if (value === "") {
                    setOldPassword("");
                    setOldPasswordError("Old Password is required");
                } else {
                    setOldPassword(value);
                    setOldPasswordError("");
                }
                break;
            case "password":
                if (value === "") {
                    setPassword("");
                    setPasswordError("New Password is required");
                } else if (passwordValidation(value)) {
                    setPassword(value);
                    setPasswordError(
                        "New Password must be atleast 8 characters, contain 2 numbers, and have 1 special character"
                    );
                } else {
                    setPassword(value);
                    setPasswordError("");
                }
                break;
            case "ConfirmPassword":
                if (value === "") {
                    setConfirmPassword("");
                    setConfirmPasswordError("New Confirm Password is required");
                } else if (value !== password) {
                    setConfirmPasswordError(
                        "New Password and New Confirm Password not same"
                    );
                    setConfirmPassword(value);
                } else {
                    setConfirmPassword(value);
                    setConfirmPasswordError("");
                }
                break;

            default:
                break;
        }
    };
    const isValidateForm = () => {
        let isValid = true;
        if (oldPassword === "") {
            setOldPasswordError("Old Password is required");
            isValid = false;
        }
        if (password === "") {
            setPasswordError("New Password is required");
            isValid = false;
        } else if (passwordValidation(password)) {
            setPasswordError(
                "New Password must be atleast 8 characters, contain 2 numbers, and have 1 special character"
            );
            isValid = false;
        }
        if (confirmPassword === "") {
            setConfirmPasswordError("New Confirm Password is required");
            isValid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError(
                "New Password and New Confirm Password not same"
            );
            isValid = false;
        }
        return isValid;
    };
    const handleChangePassword = async () => {
        const isValidationForm = isValidateForm();
        if (isValidationForm) {
            setIsLoading(true);
            const payload = {
                currentPassword: oldPassword,
                newPassword: password,
                confirmPassword: confirmPassword,
            };
            try {
                const url = getUrl("change-password");
                const res = await post(url, payload);
                const { success, message } = res;
                if (success) {
                    setIsLoading(false);
                    showToast("success", message);
                    setTimeout(() => {
                        goBack();
                    }, 1000);
                } else {
                    setIsLoading(false);
                    showToast("error", message);
                }
            } catch (error) {
                setIsLoading(false);
                showToast("error", "Internal server error.");
            }
        }
    };
    return (
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <ImageBackground
                source={images.signupBGImage}
                resizeMode="stretch"
                placeholder
                style={styles.welComeBgImg}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.backButtonView}
                        onPress={() => goBack()}
                    >
                        <Text style={styles.backBtnText}>{translations[currentLanguage].back}</Text>
                    </TouchableOpacity>
                    <View style={styles.changePassHeadingContainer}>
                        <Text style={styles.changePassHeadingText}>
                            {/* Change Password */}
                            {translations[currentLanguage].chnagePassword}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: hp(85),
                            flexDirection: "column",
                            flexGrow: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ flex: 4.6 }}>
                            <View style={styles.inputMainContainer}>
                                <CustomInput
                                    leftIconName={images.passwordIcon}
                                    leftIconStyles={styles.passwordIcon}
                                    rightIconName={
                                        isOldPasswordShown
                                            ? images.openEyeIcon
                                            : images.closedEyeIcon
                                    }
                                    rightIconStyle={
                                        isOldPasswordShown
                                            ? styles.openEyeIcon
                                            : styles.closedEyeIcon
                                    }
                                    placeholder={translations[currentLanguage].oldPassword}
                                    onChangeText={(text) =>
                                        handleTextInputChange(
                                            text,
                                            "oldPassword"
                                        )
                                    }
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={!isOldPasswordShown}
                                    rightIconClick={() => {
                                        setIsOldPasswordShown(
                                            !isOldPasswordShown
                                        );
                                    }}
                                    value={oldPassword}
                                />
                                {oldPasswordError && (
                                    <Text style={styles.errorText}>
                                        {oldPasswordError}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputMainContainer}>
                                <CustomInput
                                    leftIconName={images.passwordIcon}
                                    leftIconStyles={styles.passwordIcon}
                                    rightIconName={
                                        isPasswordShown
                                            ? images.openEyeIcon
                                            : images.closedEyeIcon
                                    }
                                    rightIconStyle={
                                        isPasswordShown
                                            ? styles.openEyeIcon
                                            : styles.closedEyeIcon
                                    }
                                    placeholder={translations[currentLanguage].newPassword}
                                    onChangeText={(text) =>
                                        handleTextInputChange(text, "password")
                                    }
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={!isPasswordShown}
                                    rightIconClick={() => {
                                        setIsPasswordShown(!isPasswordShown);
                                    }}
                                    value={password}
                                />
                                {passwordError && (
                                    <Text style={styles.errorText}>
                                        {passwordError}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputMainContainer}>
                                <CustomInput
                                    leftIconName={images.passwordIcon}
                                    leftIconStyles={styles.passwordIcon}
                                    rightIconName={
                                        isConfirmPasswordShown
                                            ? images.openEyeIcon
                                            : images.closedEyeIcon
                                    }
                                    rightIconStyle={
                                        isConfirmPasswordShown
                                            ? styles.openEyeIcon
                                            : styles.closedEyeIcon
                                    }
                                    placeholder={translations[currentLanguage].newConfirmPassword}
                                    onChangeText={(text) =>
                                        handleTextInputChange(
                                            text,
                                            "ConfirmPassword"
                                        )
                                    }
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={!isConfirmPasswordShown}
                                    rightIconClick={() => {
                                        setIsConfirmPasswordShown(
                                            !isConfirmPasswordShown
                                        );
                                    }}
                                    value={confirmPassword}
                                />
                                {confirmPasswordError && (
                                    <Text style={styles.errorText}>
                                        {confirmPasswordError}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1.4,
                                justifyContent: "center",
                                marginBottom:
                                    Platform.OS === "ios" && !isTablet
                                        ? hp(3.55)
                                        : 0,
                            }}
                        >
                            <CommonButton
                                btnTitle= {translations[currentLanguage].chnagePassword}
                                onPress={handleChangePassword}
                                disabled={isLoading}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default ChangePasswordScreen;
