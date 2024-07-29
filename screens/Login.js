import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailValidation } from "../utils/validation";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { getUrl } from "../Network/url";
import { post } from "../Network/request";

const Login = () => {
    const navigation  = useNavigation();
    const { navigate } = navigation
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            case "password":
                if (value === "") {
                    setPassword("");
                    setPasswordErr("Password is required");
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
            setEmailErr("Email address is required");
            isValid = false;
        } else if (emailValidation(email)) {
            setEmailErr("Please enter valid email address");
            isValid = false;
        }
        if (password === "") {
            setPasswordErr("Password is required");
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
                        navigate("MealSelectionPage");
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
                showToast("error", "Internal server error.");
            }
        }
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setEmail("");
            setEmailErr("");
            setPassword("");
            setPasswordErr("");
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View
                        style={{
                            width: "100%",
                            height: hp(63.8),
                            marginBottom: hp(2.55),
                        }}
                    >
                        <Image
                            resizeMode="cover"
                            source={require("../assets/Login.jpg")}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </View>

                    <View
                        style={{
                            marginBottom: hp(1.55),
                            marginHorizontal: wp(5.7),
                        }}
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

                    <View
                        style={{
                            marginBottom: hp(1.55),
                            marginHorizontal: wp(5.7),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFPercentage(2.1),
                                fontWeight: 400,
                                marginVertical: hp(1),
                            }}
                        >
                            Password
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
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={!isPasswordShown}
                                style={{
                                    width: "100%",
                                }}
                                value={password}
                                onChangeText={(text) =>
                                    handleTextInputChange(text, "password")
                                }
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    setIsPasswordShown(!isPasswordShown)
                                }
                                style={{
                                    position: "absolute",
                                    right: wp(3.15),
                                }}
                            >
                                {isPasswordShown ? (
                                    <Ionicons
                                        name="eye-off"
                                        size={24}
                                        color={COLORS.black}
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye"
                                        size={24}
                                        color={COLORS.black}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        {passwordErr && (
                            <Text
                                style={{
                                    color: COLORS.error,
                                    fontSize: RFPercentage(1.6),
                                }}
                            >
                                {passwordErr}
                            </Text>
                        )}
                    </View>
                    <View
                        style={{
                            marginHorizontal: wp(5.7),
                            marginBottom: 20,

                            flexDirection: "row",
                        }}
                    >
                        {/* <Text
                            style={{
                                fontSize: RFPercentage(2.1),
                                fontWeight: 400,
                            }}
                        >
                            Forgot Password?
                        </Text> */}
                        <Pressable onPress={() => navigate("ForgotPassword")}>
                            <Text
                                style={{
                                    fontSize: RFPercentage(2.1),
                                    color: COLORS.primary,
                                    fontWeight: "bold",
                                    marginLeft: 6,
                                }}
                            >
                                Forgot Password?
                            </Text>
                        </Pressable>
                    </View>

                    <Button
                        style={{ marginHorizontal: wp(5.7), marginBottom: 10 }}
                        title="Login"
                        filled
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginVertical: 22,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFPercentage(2.1),
                                color: COLORS.black,
                            }}
                        >
                            Don't have an account?
                        </Text>
                        <Pressable onPress={() => navigate("Signup")}>
                            <Text
                                style={{
                                    fontSize: RFPercentage(2.1),
                                    color: COLORS.primary,
                                    fontWeight: "bold",
                                    marginLeft: 6,
                                }}
                            >
                                Join Now
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Login;
