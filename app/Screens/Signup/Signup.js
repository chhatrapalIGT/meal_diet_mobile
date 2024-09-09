import React, { useCallback, useRef, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { images } from "../../Resource/Images";
import CommonButton from "../../Components/Core/CommonButton";
import COLORS from "../../constants/colors";
import CustomInput from "../../Components/Core/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { emailValidation, passwordValidation } from "../../utils/validation";
import CommonBottomSheetComponent from "../../Components/Core/CommonBottomSheetComponent";
import LoginComponent from "../../Components/LoginComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768 && screenHeight >= 768;

const styles = StyleSheet.create({
    mainWelcomeContainer: { flex: 1 },
    welComeBgImg: {
        height: screenHeight,
        width: screenWidth,
    },
    loginHeader: {
        fontSize: RFPercentage(3.4),
        color: COLORS.black,
        fontFamily: "Inter_300Light",
    },
    personIcon: { width: 19, height: 18, marginLeft: 4 },
    emailIcon: { width: 20, height: 15, marginLeft: 4 },
    passwordIcon: { width: 16, height: 19, marginLeft: 4 },
    openEyeIcon: { width: 26, height: 14, marginLeft: 4 },
    closedEyeIcon: { width: 24, height: 12, marginLeft: 4 },
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
const Signup = () => {
    const navigation = useNavigation();
    const { navigate } = navigation;
    const sheetRef = useRef(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

    const handleTextInputChange = (value, type) => {
        switch (type) {
            case "username":
                if (value === "") {
                    setUsername("");
                    setUsernameError("Name is required");
                } else {
                    setUsernameError("");
                    setUsername(value);
                }
                break;
            case "email":
                if (value === "") {
                    setEmail("");
                    setEmailError("Email address is required");
                } else if (emailValidation(email)) {
                    setEmailError("Please enter valid email address");
                    setEmail(value);
                } else {
                    setEmailError("");
                    setEmail(value);
                }
                break;
            case "password":
                if (value === "") {
                    setPassword("");
                    setPasswordError("Password is required");
                } else if (passwordValidation(value)) {
                    setPassword(value);
                    setPasswordError(
                        "Password must be atleast 8 characters, contain 2 numbers, and have 1 special character"
                    );
                } else {
                    setPasswordError("");
                    setPassword(value);
                }
                break;
            case "confirmPassword":
                if (value === "") {
                    setConfirmPasswordError("Confirm Password is required");
                    setConfirmPassword("");
                } else if (value !== password) {
                    setConfirmPasswordError(
                        "Password and Confirm Password not same"
                    );
                    setConfirmPassword(value);
                } else {
                    setConfirmPasswordError("");
                    setConfirmPassword(value);
                }
                break;
            default:
                break;
        }
    };
    const isValidateForm = () => {
        let isValid = true;
        if (username === "") {
            setUsernameError("Name is required");
            isValid = false;
        }

        if (email === "") {
            setEmailError("Email address is required");
            isValid = false;
        } else if (emailValidation(email)) {
            setEmailError("Please enter valid email address");
            isValid = false;
        }
        if (password === "") {
            setPasswordError("Password is required");
            isValid = false;
        } else if (passwordValidation(password)) {
            setPasswordError(
                "Password must be atleast 8 characters, contain 2 numbers, and have 1 special character"
            );
            isValid = false;
        }
        if (confirmPassword === "") {
            setConfirmPasswordError("Confirm Password is required");
            isValid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Password and Confirm Password not same");
            isValid = false;
        }
        return isValid;
    };
    const handleSignUp = async () => {
        const isValid = isValidateForm();
        if (isValid) {
            const userData = {
                username: username,
                email: email.toLowerCase(),
                password: password,
                confirmPassword: confirmPassword,
            };
            navigate("SignupSteps", { userData });
        }
    };

    const handleSnapPress = useCallback((index) => {
        sheetRef?.current?.snapToIndex(index);
    }, []);
    return (
        <SafeAreaView style={styles.mainWelcomeContainer}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ImageBackground
                    source={images.signupBGImage} // Use the imported image here
                    resizeMode="stretch"
                    style={styles.welComeBgImg}
                >
                    <KeyboardAwareScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        enableOnAndroid={true} // This ensures it works well on Android
                        extraHeight={100} // Adjust this value as needed
                        enableAutomaticScroll={true} // Automatically adjust scroll
                    >
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flex: 4.6,
                                    justifyContent: "flex-end",
                                    paddingBottom: 40,
                                }}
                            >
                                <View
                                    style={{
                                        marginHorizontal: 40,
                                    }}
                                >
                                    <View style={{ marginBottom: 23 }}>
                                        <Text style={styles.loginHeader}>
                                            Create account{" "}
                                        </Text>
                                    </View>
                                    <View>
                                        <CustomInput
                                            leftIconName={images.personIcon}
                                            leftIconStyles={styles.personIcon}
                                            placeholder="Name"
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "username"
                                                )
                                            }
                                            keyboardType="default"
                                            returnKeyType="next"
                                            value={username}
                                        />
                                        {usernameError && (
                                            <Text style={styles.errorText}>
                                                {usernameError}
                                            </Text>
                                        )}

                                        <CustomInput
                                            leftIconName={images.mailIcon}
                                            leftIconStyles={styles.emailIcon}
                                            placeholder="E-mail"
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "email"
                                                )
                                            }
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            value={email}
                                        />
                                        {emailError && (
                                            <Text style={styles.errorText}>
                                                {emailError}
                                            </Text>
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
                                            placeholder="Password"
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "password"
                                                )
                                            }
                                            keyboardType="default"
                                            returnKeyType="next"
                                            secureTextEntry={!isPasswordShown}
                                            rightIconClick={() => {
                                                setIsPasswordShown(
                                                    !isPasswordShown
                                                );
                                            }}
                                            value={password}
                                        />
                                        {passwordError && (
                                            <Text style={styles.errorText}>
                                                {passwordError}
                                            </Text>
                                        )}

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
                                            placeholder="Confirm Password"
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "confirmPassword"
                                                )
                                            }
                                            keyboardType="default"
                                            returnKeyType="done"
                                            secureTextEntry={
                                                !isConfirmPasswordShown
                                            }
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
                            </View>
                            <View
                                style={{
                                    flex: 1.4,
                                    justifyContent: "center",
                                    marginBottom:
                                        Platform.OS === "ios"&&!isTablet ? hp(3.55) : 0,
                                }}
                            >
                                <CommonButton
                                    btnTitle="Signup"
                                    onPress={handleSignUp}
                                />
                                <View style={styles.textWithSignupLinkTextView}>
                                    <Text style={styles.simpleText}>
                                        You already have an account?
                                    </Text>
                                    <Pressable
                                        onPress={() => handleSnapPress(0)}
                                    >
                                        <Text
                                            style={styles.linkText}
                                        >{` Login`}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
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

export default Signup;
