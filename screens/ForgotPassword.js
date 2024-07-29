import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

import COLORS from "../constants/colors";
import Button from "../components/Button";
import { emailValidation, passwordValidation } from "../utils/validation";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";

const styles = StyleSheet.create({
    changePassowrdMainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    backButtonView: {
        marginTop: hp(2.8),
        marginHorizontal: wp(6.2),
        backgroundColor: COLORS.primary,
        width: 70,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
    },
    backBtnText: {
        fontSize: RFPercentage(2.9),
        fontWeight: "bold",
        color: COLORS.white,
        paddingVertical: 5,
    },
    changePassHeadingContainer: {
        marginHorizontal: wp(6.2),
    },
    changePassHeadingText: {
        fontSize: RFPercentage(2.9),
        fontWeight: "bold",
        marginVertical: hp(1.55),
        color: COLORS.black,
    },
    inputMainContainer: { marginBottom: hp(1.55), marginHorizontal: wp(6.2) },
    inputlabelText: {
        fontSize: RFPercentage(2.1),
        fontWeight: "400",
        marginVertical: hp(1),
    },
    inputView: {
        width: "100%",
        height: hp(6.15),
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wp(5.7),
    },
    inputStyle: {
        width: "100%",
    },
    passwordView: { position: "absolute", right: wp(3.15) },
    signupBtn: {
        marginHorizontal: wp(6.2),
        marginBottom:20
    },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
    },
});

const ForgotPassword = () => {
    const { goBack } = useNavigation();
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [isOptSendSuccess, setIsOptSendSuccess] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpErr, setOtpErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "top",
        });
    };

    const handleTextInputChange = (value, type) => {
        switch (type) {
            case "email":
                if (value === "") {
                    setEmail("");
                    setEmailErr("Email address is required");
                } else if (emailValidation(email)) {
                    setEmailErr("Please enter valid email address");
                    setEmail(value);
                } else {
                    setEmailErr("");
                    setEmail(value);
                }
                break;
            case "otp":
                const replaceNumeric = value.replace(/[^0-9]/g, "");
                if (replaceNumeric === "") {
                    setOtp("");
                    setOtpErr("Otp is Required");
                } else if (replaceNumeric.length !== 4) {
                    setOtpErr("Please enter exact 4 digit otp");
                    setOtp(replaceNumeric);
                } else {
                    setOtpErr("");
                    setOtp(replaceNumeric);
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
                    setPassword(value);
                    setPasswordError("");
                }
                break;
            case "ConfirmPassword":
                if (value === "") {
                    setConfirmPassword("");
                    setConfirmPasswordError("Confirm Password is required");
                } else if (value !== password) {
                    setConfirmPasswordError(
                        "Password and Confirm Password not same"
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
    const isFormValidation = () => {
        let isValid = true;
        if (email === "") {
            setEmailErr("Email address is required");
            isValid = false;
        } else if (emailValidation(email)) {
            setEmailErr("Please enter valid email address");
            isValid = false;
        }
        if (isOptSendSuccess) {
            if (otp === "") {
                setOtpErr("Otp is Required");
                isValid = false;
            } else if (otp.length !== 4) {
                setOtpErr("Please enter exact 4 digit otp");
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
        }

        return isValid;
    };
    const handleForgotPassword = async (type) => {
        const isValid = isFormValidation();
        if (isValid) {
            if (type === "sendOtp") {
                setIsLoading(true);
                const payload = {
                    email: email.toLowerCase(),
                };
                try {
                    const url = getUrl("forgot-password");
                    const res = await post(url, payload);
                    const { success, message } = res;
                    if (success) {
                        setIsOptSendSuccess(true);
                        setTimeLeft(120);
                        showToast("success", message);
                        setIsLoading(false);
                    } else {
                        showToast("error", message);
                        setIsOptSendSuccess(false);
                        setIsLoading(false);
                    }
                } catch (error) {
                    showToast("error", "Internal server error.", error);
                    setIsOptSendSuccess(false);
                    setIsLoading(false);
                }
            } else if (type === "resetPass") {
                setIsLoading(true);
                const payload = {
                    email: email.toLowerCase(),
                    otp: otp,
                    newPassword: password,
                    confirmPassword: confirmPassword,
                };
                try {
                    const url = getUrl("reset-password");
                    const res = await post(url, payload);
                    const { success, message } = res;
                    if (success) {
                        setTimeout(() => {
                            goBack();
                        }, 1000);
                        showToast("success", message);
                        setIsLoading(false);
                    } else {
                        showToast("error", message);
                        setIsLoading(false);
                    }
                } catch (error) {
                    showToast("error", "Internal server error.", error);
                    setIsOptSendSuccess(false);
                    setIsLoading(false);
                }
            }
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    };
    useEffect(() => {
        let intervalId;
        if (isOptSendSuccess) {
            if (timeLeft === 0) return;
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [timeLeft, isOptSendSuccess]);
    return (
        <SafeAreaView style={styles.changePassowrdMainContainer}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.backButtonView}
                        onPress={() => goBack()}
                    >
                        <Text style={styles.backBtnText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.changePassHeadingContainer}>
                        <Text style={styles.changePassHeadingText}>
                            Forgot Password
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        height: hp(85),
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <View
                            style={{
                                marginBottom: hp(1.55),
                                marginHorizontal: wp(5.7),
                                backgroundColor: isOptSendSuccess
                                    ? COLORS.primary
                                    : COLORS.white,
                                opacity: isOptSendSuccess ? 0.3 : 1,
                            }}
                            pointerEvents={isOptSendSuccess ? "none" : "auto"}
                        >
                            <Text
                                style={{
                                    fontSize: RFPercentage(2.1),
                                    fontWeight: 400,
                                    marginVertical: hp(1),
                                }}
                            >
                                Email-ID
                            </Text>

                            <View
                                style={{
                                    width: "100%",
                                    height: hp(6.15),
                                    borderColor: COLORS.black,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingLeft: wp(5.7),
                                }}
                            >
                                <TextInput
                                    placeholder="Enter your email address"
                                    placeholderTextColor={COLORS.black}
                                    keyboardType="email-address"
                                    style={{
                                        width: "100%",
                                    }}
                                    value={email}
                                    onChangeText={(text) =>
                                        handleTextInputChange(text, "email")
                                    }
                                />
                            </View>
                            {emailErr && (
                                <Text
                                    style={{
                                        color: COLORS.error,
                                        fontSize: RFPercentage(1.6),
                                    }}
                                >
                                    {emailErr}
                                </Text>
                            )}
                        </View>
                        {isOptSendSuccess && (
                            <View>
                                <View style={styles.inputMainContainer}>
                                    <Text style={styles.inputlabelText}>
                                        OTP
                                    </Text>

                                    <View style={styles.inputView}>
                                        <TextInput
                                            keyboardType="number-pad"
                                            placeholderTextColor={COLORS.black}
                                            style={styles.inputStyle}
                                            value={otp}
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "otp"
                                                )
                                            }
                                        />
                                    </View>
                                    {otpErr ? (
                                        <Text style={styles.errorText}>
                                            {otpErr}
                                        </Text>
                                    ) : null}
                                </View>

                                <View style={styles.inputMainContainer}>
                                    <Text style={styles.inputlabelText}>
                                        New Password
                                    </Text>

                                    <View style={styles.inputView}>
                                        <TextInput
                                            // placeholder="Enter your password"
                                            placeholderTextColor={COLORS.black}
                                            secureTextEntry={!isPasswordShown}
                                            style={styles.inputStyle}
                                            value={password}
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "password"
                                                )
                                            }
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                setIsPasswordShown(
                                                    !isPasswordShown
                                                )
                                            }
                                            style={styles.passwordView}
                                        >
                                            <Ionicons
                                                name={
                                                    isPasswordShown
                                                        ? "eye-off"
                                                        : "eye"
                                                }
                                                size={24}
                                                color={COLORS.black}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {passwordError ? (
                                        <Text style={styles.errorText}>
                                            {passwordError}
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={styles.inputMainContainer}>
                                    <Text style={styles.inputlabelText}>
                                        New Confirm Password
                                    </Text>

                                    <View style={styles.inputView}>
                                        <TextInput
                                            // placeholder="Enter your password"
                                            placeholderTextColor={COLORS.black}
                                            secureTextEntry={!isConfirmPasswordShown}
                                            style={styles.inputStyle}
                                            value={confirmPassword}
                                            onChangeText={(text) =>
                                                handleTextInputChange(
                                                    text,
                                                    "ConfirmPassword"
                                                )
                                            }
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                setIsConfirmPasswordShown(
                                                    !isConfirmPasswordShown
                                                )
                                            }
                                            style={styles.passwordView}
                                        >
                                            <Ionicons
                                                name={
                                                    isConfirmPasswordShown
                                                        ? "eye-off"
                                                        : "eye"
                                                }
                                                size={24}
                                                color={COLORS.black}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {confirmPasswordError ? (
                                        <Text style={styles.errorText}>
                                            {confirmPasswordError}
                                        </Text>
                                    ) : null}
                                </View>
                                <View
                                    style={{
                                        marginHorizontal: wp(5.7),
                                        marginBottom: 20,

                                        flexDirection: "row",
                                    }}
                                >
                                    <Pressable
                                        onPress={() => {
                                            handleForgotPassword("sendOtp");
                                        }}
                                        disabled={timeLeft !== 0}
                                        style={{
                                            opacity: timeLeft !== 0 ? 0.5 : 1,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.1),
                                                color: COLORS.primary,
                                                fontWeight: "bold",
                                                marginLeft: 6,
                                            }}
                                        >
                                            Resend
                                        </Text>
                                    </Pressable>
                                    {timeLeft !== 0 && (
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.1),
                                                fontWeight: 400,
                                                paddingLeft: 20,
                                            }}
                                        >
                                            {formatTime(timeLeft)}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        )}
                    </View>
                    <View>
                        <View>
                            <Button
                                disabled={isLoading}
                                style={styles.signupBtn}
                                title={
                                    isOptSendSuccess
                                        ? "Reset Password"
                                        : "Send OTP"
                                }
                                filled
                                onPress={() =>
                                    handleForgotPassword(
                                        isOptSendSuccess
                                            ? "resetPass"
                                            : "sendOtp"
                                    )
                                }
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgotPassword;
