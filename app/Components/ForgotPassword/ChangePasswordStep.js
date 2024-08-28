import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomInput from "../Core/CustomInput";
import CommonButton from "../Core/CommonButton";
import { images } from "../../Resource/Images";
import COLORS from "../../constants/colors";
import { passwordValidation } from "../../utils/validation";

const styles = StyleSheet.create({
    mainWapper: {
        marginLeft: wp(5.38),
        marginRight: wp(4.61),
        marginTop: hp(4.02),
    },
    headerText: {
        fontSize: RFPercentage(2.9),
        color: COLORS.greyText,
        fontFamily: "Inter_400Regular",
    },
    passwordInputWapper: { marginTop: hp(5.33) },
    cPasswordInputWapper: { marginTop: hp(2.6) },
    passwordIcon: { width: 16, height: 19, marginLeft: 4 },
    openEyeIcon: { width: 26, height: 14, marginLeft: 4 },
    closedEyeIcon: { width: 24, height: 12, marginLeft: 4 },
    btnStyle: { marginHorizontal: 0, marginTop: hp(2.13) },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
        fontFamily: "Inter_500Medium",
    },
});

const ChangePasswordStep = ({ handleSubmit }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

    const handleTextInputChange = (value, type) => {
        switch (type) {
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
    const handleSubmitPassword = async () => {
        const isValid = isValidateForm();
        if (isValid) {
            const passData = {
                newPassword: password,
                confirmPassword: confirmPassword,
            };
            handleSubmit(passData);
        }
    };

    return (
        <View style={styles.mainWapper}>
            <Text style={styles.headerText}>Enter new password</Text>
            <View>
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
                        handleTextInputChange(text, "password")
                    }
                    keyboardType="default"
                    returnKeyType="next"
                    secureTextEntry={!isPasswordShown}
                    rightIconClick={() => {
                        setIsPasswordShown(!isPasswordShown);
                    }}
                    value={password}
                    inputCustomWrapper={styles.passwordInputWapper}
                />
                {passwordError && (
                    <Text style={styles.errorText}>{passwordError}</Text>
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
                        handleTextInputChange(text, "confirmPassword")
                    }
                    keyboardType="default"
                    returnKeyType="done"
                    secureTextEntry={!isConfirmPasswordShown}
                    rightIconClick={() => {
                        setIsConfirmPasswordShown(!isConfirmPasswordShown);
                    }}
                    value={confirmPassword}
                    inputCustomWrapper={styles.cPasswordInputWapper}
                />
                {confirmPasswordError && (
                    <Text style={styles.errorText}>{confirmPasswordError}</Text>
                )}
            </View>
            <CommonButton
                onPress={handleSubmitPassword}
                btnTitle="Confirm"
                btnContainerStyle={styles.btnStyle}
            />
        </View>
    );
};

export default ChangePasswordStep;
