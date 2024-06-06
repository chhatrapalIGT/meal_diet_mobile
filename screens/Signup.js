import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import Checkbox from "expo-checkbox";
import TermsAndConditions from "./TermsAndConditions";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import axios from "axios";
import Toast from "react-native-toast-message";

const Signup = ({ navigation }) => {
    const [idNumber, setIdNumber] = useState("");
    // const [Fullname, setFullname] = useState('');
    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleTermsLinkPress = () => {
        navigation.navigate("TermsAndConditions");
    };

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "top",
        });
    };

    const handleSignUp = async () => {
        // Reset error messages
        setEmailError("");
        setPasswordError("");

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            return;
        }

        // Validate password complexity
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be atleast 8 characters, contain 2 numbers, and have 1 special character"
            );
            return;
        }

        try {
            const userData = {
                IDnumber: idNumber,
                // Fullname:Fullname,
                gender: gender,
                username: email,
                password: password,
                termsAndConditions: isChecked,
            };
            console.log("SignUp Payload:", userData);

            const response = await axios.post(
                "http://209.97.132.213:3000/auth/register",
                userData
            );

            console.log(
                "User registration successful:",
                response,
                response.data
            );

            // navigation.navigate('HomePage', { gender: gender });

            // Show success message
            showToast(
                "success",
                "Registration Successful",
                "You have successfully registered. Now you can log in."
            );
            navigation.navigate("Login");
            //navigation.navigate('HomePage', { gender: gender });
        } catch (error) {
            // console.log("Error signing up:", error);

            if (error?.response?.status === 400) {
                showToast(
                    "error",
                    "Registration Failed",
                    error.response.data.message
                );
            } else {
                showToast(
                    "error",
                    "Registration Failed",
                    "There was an error during registration. Please try again."
                );
            }
            // Show error message
        }
    };

    const renderGenderButton = (value, label) => (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 8,
                padding: 10,
                marginRight: 10,
                backgroundColor:
                    gender === value ? COLORS.primary : "transparent",
            }}
            onPress={() => setGender(value)}
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                <View style={{ flex: 1, marginHorizontal: 25 }}>
                    <Image
                        source={require("../assets/SignupPageimage.png")}
                        style={{
                            flex: 1,
                            width: "100%",
                            height: undefined,
                            aspectRatio: 2.6,
                            marginBottom: 1,
                        }}
                    />

                    <View style={{ marginVertical: 22 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                marginVertical: 12,
                                color: COLORS.black,
                            }}
                        >
                            Create Account
                        </Text>

                        <Text style={{ fontSize: 16, color: COLORS.black }}>
                            Connect with your friend today!
                        </Text>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                marginVertical: 8,
                            }}
                        >
                            IDnumber
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                height: 48,
                                borderColor: COLORS.black,
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22,
                            }}
                        >
                            <TextInput
                                placeholder="Enter your IDnumber"
                                placeholderTextColor={COLORS.black}
                                keyboardType="numeric"
                                style={{
                                    width: "80%",
                                }}
                                value={idNumber}
                                onChangeText={(text) => setIdNumber(text)}
                            />
                        </View>
                    </View>

                    {/* <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Fullname</Text>


          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your Full name"
              placeholderTextColor={COLORS.black}
            
              style={{
                width: '80%',
              }}
              value={Fullname}
              onChangeText={(text) => setFullname(text)}
            />
          </View>
        </View> */}

                    <View style={{ marginBottom: 12 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                marginVertical: 8,
                            }}
                        >
                            Gender
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            {renderGenderButton("Male", "Male")}
                            {renderGenderButton("Female", "Female")}
                            {renderGenderButton("Others", "Others")}
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                marginVertical: 8,
                            }}
                        >
                            Email-ID
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                height: 48,
                                borderColor: COLORS.black,
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22,
                            }}
                        >
                            <TextInput
                                placeholder="abc@mail.com"
                                placeholderTextColor={COLORS.black}
                                keyboardType="email-address"
                                style={{
                                    width: "100%",
                                }}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError("");
                                }}
                            />
                        </View>
                        {emailError ? (
                            <Text style={{ color: COLORS.error, fontSize: 12 }}>
                                {emailError}
                            </Text>
                        ) : null}
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                marginVertical: 8,
                            }}
                        >
                            Password
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                height: 48,
                                borderColor: COLORS.black,
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22,
                            }}
                        >
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.black}
                                //secureTextEntry={true}
                                secureTextEntry={!isPasswordShown}
                                style={{
                                    width: "100%",
                                }}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError("");
                                }}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setIsPasswordShown(!isPasswordShown)
                                }
                                style={{
                                    position: "absolute",
                                    right: 12,
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
                        {passwordError ? (
                            <Text style={{ color: COLORS.error, fontSize: 12 }}>
                                {passwordError}
                            </Text>
                        ) : null}
                    </View>
                    <View style={{display:'flex', flexDirection:'row',alignItems:'center',marginBottom:10}}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.primary : undefined}
                        />
                        <Pressable onPress={handleTermsLinkPress}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginVertical: 6,
                                    alignItems: "left",
                                }}
                            >
                                <Text>
                                    I agree to the{" "}
                                    <Text
                                        style={{
                                            color: COLORS.primary,
                                            textDecorationLine: "underline",
                                        }}
                                    >
                                        terms and conditions
                                    </Text>
                                </Text>
                            </View>
                        </Pressable>
                    </View>

                    <Button title="Signup" filled onPress={handleSignUp} />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginVertical: 22,
                        }}
                    >
                        <Text style={{ fontSize: 16, color: COLORS.black }}>
                            Already have an account
                        </Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: COLORS.primary,
                                    fontWeight: "bold",
                                    marginLeft: 6,
                                }}
                            >
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;
