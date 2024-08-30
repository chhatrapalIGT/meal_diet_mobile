import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomInput from "../Core/CustomInput";
import CommonButton from "../Core/CommonButton";
import COLORS from "../../constants/colors";
import { images } from "../../Resource/Images";
import { emailValidation } from "../../utils/validation";
const styles = StyleSheet.create({
    mainWapper: {
        marginTop: hp(3.08),
        marginLeft: wp(5.38),
        marginRight: wp(4.61),
    },
    header: {
        fontSize: RFPercentage(2.9),
        color: COLORS.greyText,
        fontFamily: "Inter_400Regular",
        lineHeight: hp(3.55),
    },
    emailIcon: { width: 20, height: 15, marginLeft: 4 },
    inputWrapper: { paddingLeft: 3, marginTop: hp(4.85) },
    btnWrapper: { marginHorizontal: 0, marginTop: hp(7.10) },
    errorText: {
        color: COLORS.error,
        fontSize: RFPercentage(1.6),
        fontFamily: "Inter_500Medium",
    },
});
const VerifyEmailStep = ({ handleSubmit, isLoading }) => {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
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
        return isValid;
    };
    return (
        <View style={styles.mainWapper}>
            <Text style={styles.header}>
                Send verification code to e-mail address
            </Text>
            <CustomInput
                leftIconName={images.mailIcon}
                leftIconStyles={styles.emailIcon}
                placeholder="E-mail"
                onChangeText={(text) => handleTextInputChange(text, "email")}
                keyboardType="email-address"
                returnKeyType="done"
                value={email}
                inputCustomWrapper={styles.inputWrapper}
            />
            {emailErr && <Text style={styles.errorText}>{emailErr}</Text>}
            <CommonButton
                onPress={() => {
                    const isValid = isValidateForm();
                    if (isValid) {
                        handleSubmit({ email: email.toLowerCase() });
                    }
                }}
                btnTitle="Next"
                btnContainerStyle={styles.btnWrapper}
                disabled={isLoading}
            />
        </View>
    );
};

export default VerifyEmailStep;