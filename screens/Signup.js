import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

import COLORS from "../constants/colors";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import { emailValidation, passwordValidation } from "../utils/validation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";

const styles = StyleSheet.create({
    signupMainConatiner: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    signUpBannerContainer: {
        height: hp(16.55),
        marginHorizontal: wp(6.5),
        marginBottom: 1,
    },
    signUpBannerImg: {
        width: "100%",
        height: "100%",
        aspectRatio: 2.5,
    },
    signUpHeadingContainer: {
        marginVertical: hp(2.8),
        marginHorizontal: wp(6.2),
    },
    signUpHeadingText: {
        fontSize: RFPercentage(2.9),
        fontWeight: "bold",
        marginVertical: hp(1.55),
        color: COLORS.black,
    },
    signUpHeadingText1: { fontSize: RFPercentage(2.1), color: COLORS.black },
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
    genderMainBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
    },
    termAndConditionMainConatiner: {
        marginBottom: 10,
        marginHorizontal: wp(6.2),
    },
    termAndConditionConatiner: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    termAndConditionConatinerCheckbox: { marginRight: 8 },
    termAndConditionConatinerLinkView: {
        flexDirection: "row",
        marginVertical: 6,
        alignItems: "left",
    },
    signupBtn: { marginHorizontal: wp(6.2) },
    loginLinkMainView: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22,
    },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
    },
});
const Signup = () => {
    const navigation = useNavigation();
    const { navigate } = navigation;
    const route = useRoute();
    const { isTermAndCondition } = route.params || "";
    const [idNumber, setIdNumber] = useState("");
    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isTermAndConditionErr, setIsTermAndConditionErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleTermsLinkPress = () => {
        navigate("TermsAndConditions");
    };

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
        if (gender === "") {
            setGenderError("Gender is required");
            isValid = false;
        }
        if (!isChecked) {
            setIsTermAndConditionErr(
                "Terms and conditions. Please fill them out"
            );
            isValid = false;
        }
        return isValid;
    };
    const handleSignUp = async () => {
        const isValid = isValidateForm();
        if (isValid) {
            try {
                setIsLoading(true);
                const userData = {
                    IDnumber: idNumber,
                    email: email.toLowerCase(),
                    gender: gender,
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                    termsAndConditions: isChecked,
                };
                const url = getUrl("register");
                const res = await post(url, userData);
                const { success, message } = res;
                if (success) {
                    setIsLoading(false);
                    showToast("success", message);
                    setTimeout(() => {
                        navigate("Login");
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

    const renderGenderButton = (value, label) => (
        <TouchableOpacity
            style={{
                ...styles.genderMainBtn,
                backgroundColor:
                    gender === value ? COLORS.primary : "transparent",
            }}
            onPress={() => {
                setGender(value);
                setGenderError("");
            }}
        >
            <Text
                style={{
                    color: gender === value ? COLORS.white : COLORS.primary,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
   
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (isTermAndCondition === undefined) {
                setIdNumber("");
                setUsername("");
                setUsernameError("");
                setEmail("");
                setEmailError("");
                setPassword("");
                setPasswordError("");
                setConfirmPassword("");
                setConfirmPasswordError("");
                setGender("");
                setGenderError("");
                setIsChecked(false);
                setIsTermAndConditionErr("");
            } else {
                setIsChecked(isTermAndCondition);
                setIsTermAndConditionErr("");
            }
        });

        return unsubscribe;
    }, [navigation, isTermAndCondition]);

    return (
        <SafeAreaView style={styles.signupMainConatiner}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={styles.signUpBannerContainer}>
                        <Image
                            source={require("../assets/SignupPageimage.png")}
                            resizeMode="cover"
                            style={styles.signUpBannerImg}
                        />
                    </View>
                    <View style={styles.signUpHeadingContainer}>
                        <Text style={styles.signUpHeadingText}>
                            Create Account
                        </Text>

                        <Text style={styles.signUpHeadingText1}>
                            Connect with your friend today!
                        </Text>
                    </View>

                    <View style={styles.inputMainContainer}>
                        <Text style={styles.inputlabelText}>IDnumber</Text>

                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Enter your IDnumber"
                                placeholderTextColor={COLORS.black}
                                keyboardType="numeric"
                                style={styles.inputStyle}
                                value={idNumber}
                                onChangeText={(text) => setIdNumber(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputMainContainer}>
                        <Text style={styles.inputlabelText}>Name</Text>

                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Enter your name"
                                placeholderTextColor={COLORS.black}
                                style={styles.inputStyle}
                                value={username}
                                onChangeText={(text) =>
                                    handleTextInputChange(text, "username")
                                }
                            />
                        </View>
                        {usernameError && (
                            <Text style={styles.errorText}>
                                {usernameError}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputMainContainer}>
                        <Text style={styles.inputlabelText}>Email-ID</Text>

                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="abc@mail.com"
                                placeholderTextColor={COLORS.black}
                                keyboardType="email-address"
                                style={styles.inputStyle}
                                value={email}
                                onChangeText={(text) =>
                                    handleTextInputChange(text, "email")
                                }
                            />
                        </View>
                        {emailError ? (
                            <Text style={styles.errorText}>{emailError}</Text>
                        ) : null}
                    </View>

                    <View style={styles.inputMainContainer}>
                        <Text style={styles.inputlabelText}>Password</Text>

                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={!isPasswordShown}
                                style={styles.inputStyle}
                                value={password}
                                onChangeText={(text) =>
                                    handleTextInputChange(text, "password")
                                }
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setIsPasswordShown(!isPasswordShown)
                                }
                                style={styles.passwordView}
                            >
                                <Ionicons
                                    name={isPasswordShown ? "eye-off" : "eye"}
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
                            Confirm Password
                        </Text>

                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Enter your confirm password"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={!isConfirmPasswordShown}
                                style={styles.inputStyle}
                                value={confirmPassword}
                                onChangeText={(text) =>
                                    handleTextInputChange(
                                        text,
                                        "confirmPassword"
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
                        {confirmPasswordError && (
                            <Text style={styles.errorText}>
                                {confirmPasswordError}
                            </Text>
                        )}
                    </View>
                    <View style={styles.inputMainContainer}>
                        <Text style={styles.inputlabelText}>Gender</Text>
                        <View style={{ flexDirection: "row" }}>
                            {renderGenderButton("Male", "Male")}
                            {renderGenderButton("Female", "Female")}
                            {renderGenderButton("Others", "Others")}
                        </View>
                        {genderError && (
                            <Text style={styles.errorText}>{genderError}</Text>
                        )}
                    </View>
                    <View style={styles.termAndConditionMainConatiner}>
                        <View style={styles.termAndConditionConatiner}>
                            <Checkbox
                                style={styles.termAndConditionConatinerCheckbox}
                                value={isChecked}
                                onValueChange={() => {
                                    setIsChecked(!isChecked);
                                    setIsTermAndConditionErr("");
                                }}
                                color={isChecked ? COLORS.primary : undefined}
                            />
                            <Pressable onPress={handleTermsLinkPress}>
                                <View
                                    style={
                                        styles.termAndConditionConatinerLinkView
                                    }
                                >
                                    <Text>
                                        I agree to the{" "}
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                                textDecorationLine: "underline",
                                            }}
                                        >
                                            Terms and conditions
                                        </Text>
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                        {isTermAndConditionErr && (
                            <Text style={styles.errorText}>
                                {isTermAndConditionErr}
                            </Text>
                        )}
                    </View>

                    <Button
                        style={styles.signupBtn}
                        title="Signup"
                        filled
                        onPress={handleSignUp}
                        disabled={isLoading}
                    />

                    <View style={styles.loginLinkMainView}>
                        <Text
                            style={{
                                fontSize: RFPercentage(2.1),
                                color: COLORS.black,
                            }}
                        >
                            Already have an account?
                        </Text>
                        <Pressable onPress={() => navigate("Login")}>
                            <Text
                                style={{
                                    fontSize: RFPercentage(2.1),
                                    color: COLORS.primary,
                                    fontWeight: "bold",
                                    marginLeft: 6,
                                }}
                            >
                                Login Now
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;
