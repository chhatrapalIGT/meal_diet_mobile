import React, { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { passwordValidation } from "../utils/validation";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
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
        width: wp(17),
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
const ChangePassowrd = () => {
    const { goBack } = useNavigation();
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
                            Change Password
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
                        <View>
                            <View style={styles.inputMainContainer}>
                                <Text style={styles.inputlabelText}>
                                    Old Password
                                </Text>

                                <View style={styles.inputView}>
                                    <TextInput
                                        // placeholder="Enter your password"
                                        placeholderTextColor={COLORS.black}
                                        secureTextEntry={!isOldPasswordShown}
                                        style={styles.inputStyle}
                                        value={oldPassword}
                                        onChangeText={(text) =>
                                            handleTextInputChange(
                                                text,
                                                "oldPassword"
                                            )
                                        }
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setIsOldPasswordShown(
                                                !isOldPasswordShown
                                            )
                                        }
                                        style={styles.passwordView}
                                    >
                                        <Ionicons
                                            name={
                                                isOldPasswordShown
                                                    ? "eye-off"
                                                    : "eye"
                                            }
                                            size={24}
                                            color={COLORS.black}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {oldPasswordError ? (
                                    <Text style={styles.errorText}>
                                        {oldPasswordError}
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
                                            setIsPasswordShown(!isPasswordShown)
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
                        </View>
                        <View>
                            <Button
                                disabled={isLoading}
                                style={styles.signupBtn}
                                title="Change Password"
                                filled
                                onPress={handleChangePassword}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangePassowrd;
