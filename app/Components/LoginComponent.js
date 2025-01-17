import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Modal,
    Button,
    Dimensions,
    Platform,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "./Core/CustomInput";
import CommonButton from "./Core/CommonButton";
import COLORS from "../constants/colors";
import { images } from "../Resource/Images";
import { emailValidation } from "../utils/validation";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";
import showToast from "./Core/CustomTost";
import ForgotPassword from "./ForgotPassword";
import { useSelector } from "react-redux";
import { translations } from "../Language";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768 && screenHeight >= 768;
const styles = StyleSheet.create({
    mainContainer: {
        height: Platform.OS === "ios" && !isTablet ? hp(32.5) : hp(38.5),
        marginTop: hp(1.55),
        marginLeft: wp(12),
        marginRight: wp(8.1),
    },
    loginHeader: {
        fontSize: RFPercentage(3.4),
        color: COLORS.black,
        fontFamily: "Inter_300Light",
    },
    emailIcon: { width: 20, height: 15, marginLeft: 4 },
    passwordIcon: { width: 16, height: 19, marginLeft: 4 },
    openEyeIcon: { width: 26, height: 14, marginLeft: 4 },
    closedEyeIcon: { width: 24, height: 12, marginLeft: 4 },
    footerContainer: {
        height: Platform.OS === "ios" && !isTablet ? hp(22.5) : hp(16.5),
    },
    textWithForgotPasswordLinkTextView: {
        flexDirection: "row",
        marginTop: hp(1.9),
    },
    textWithSignupLinkTextView: {
        flexDirection: "row",
        marginVertical: hp(1.55),
        marginLeft: wp(14.1),
    },
    simpleText: {
        fontSize: RFPercentage(1.3),
        color: COLORS.greyText,
        fontFamily: "Inter_500Medium",
    },
    linkText: {
        fontSize: RFPercentage(1.3),
        color: COLORS.primaryNew,
        fontFamily: "Inter_500Medium",
    },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
        fontFamily: "Inter_500Medium",
    },
});
const LoginComponent = ({ handleCloseSlider }) => {
    const currentLanguage = useSelector((state) => state.language.language);

    const navigation = useNavigation();
    const { navigate } = navigation;
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const handleTextInputChange = (value, type) => {
        switch (type) {
            case "email":
                if (value === "") {
                    setEmail("");
                    setEmailErr(translations[currentLanguage].emailIsRequired);
                } else if (emailValidation(email)) {
                    setEmailErr(translations[currentLanguage].validEmail);
                    setEmail(value);
                } else {
                    setEmailErr("");
                    setEmail(value);
                }
                break;
            case "password":
                if (value === "") {
                    setPassword("");
                    setPasswordErr(translations[currentLanguage].passwordIsRequired);
                } else {
                    setPasswordErr("");
                    setPassword(value);
                }
                break;
            default:
                break;
        }
    };

    const isValidateForm = () => {
        let isValid = true;
        if (email === "") {
            setEmailErr(translations[currentLanguage].emailIsRequired);
            isValid = false;
        } else if (emailValidation(email)) {
            setEmailErr(translations[currentLanguage].validEmail);
            isValid = false;
        }
        if (password === "") {
            setPasswordErr(translations[currentLanguage].passwordIsRequired);
            isValid = false;
        }
        return isValid;
    };

    const handleLogin = async () => {
        const isValid = isValidateForm();
        if (isValid) {
            try {
                setIsLoading(true);
                const userData = {
                    email: email.toLowerCase(),
                    password: password,
                };
                const url = getUrl("login");
                const res = await post(url, userData);
                const { success, data, message } = res;
                if (success) {
                    setIsLoading(false);
                    await AsyncStorage.setItem(
                        "userToken",
                        JSON.stringify(data.authToken)
                    );
                    showToast("success", message);
                    setTimeout(() => {
                        navigate("MealListing");
                    }, 1000);
                    setEmailErr("");
                    setEmail("");
                    setPassword("");
                    setPasswordErr("");
                } else {
                    setIsLoading(false);
                    showToast("error", message);
                }
            } catch (error) {
                setIsLoading(false);
                showToast("error", translations[currentLanguage].internalServerError);
            }
        }
    };
    const handleRedirectSignup = () => {
        handleCloseSlider();
        navigate("Signup");
    };
    return (
        <KeyboardAwareScrollView
            // style={{ flex: 1 }}
            // contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true} // This ensures it works well on Android
            extraHeight={100} // Adjust this value as needed
            enableAutomaticScroll={true} // Automatically adjust scroll
        >
            <View>
                <View style={styles.mainContainer}>
                    <Text style={styles.loginHeader}>{translations[currentLanguage].helloAgain}</Text>

                    <CustomInput
                        leftIconName={images.mailIcon}
                        leftIconStyles={styles.emailIcon}
                        placeholder={translations[currentLanguage].email}
                        onChangeText={(text) =>
                            handleTextInputChange(text, "email")
                        }
                        keyboardType="email-address"
                        returnKeyType="next"
                        value={email}
                    />
                    {emailErr && (
                        <Text style={styles.errorText}>{emailErr}</Text>
                    )}
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
                        placeholder={translations[currentLanguage].password}
                        onChangeText={(text) =>
                            handleTextInputChange(text, "password")
                        }
                        keyboardType="default"
                        returnKeyType="done"
                        secureTextEntry={!isPasswordShown}
                        rightIconClick={() => {
                            setIsPasswordShown(!isPasswordShown);
                        }}
                        value={password}
                    />
                    {passwordErr && (
                        <Text style={styles.errorText}>{passwordErr}</Text>
                    )}
                    <View style={styles.textWithForgotPasswordLinkTextView}>
                        <Text style={styles.simpleText}>{translations[currentLanguage].forgotPasswordText}</Text>
                        <Pressable onPress={() => setModalVisible(true)}>
                            <Text style={styles.linkText}>
                                {` ${translations[currentLanguage].chnagePassword} `}
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <CommonButton
                        btnTitle={translations[currentLanguage].login}
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                    <View style={styles.textWithSignupLinkTextView}>
                        <Text style={styles.simpleText}>
                            {translations[currentLanguage].youDoNotHaveaccount}
                        </Text>
                        <Pressable onPress={handleRedirectSignup}>
                            <Text style={styles.linkText}>{` ${translations[currentLanguage].signup}`}</Text>
                        </Pressable>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ForgotPassword
                        handleClose={() => setModalVisible(false)}
                    />
                </Modal>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default LoginComponent;
