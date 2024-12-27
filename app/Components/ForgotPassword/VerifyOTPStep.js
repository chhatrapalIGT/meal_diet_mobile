import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import CommonButton from "../Core/CommonButton";
import COLORS from "../../constants/colors";
import { Keyboard } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { translations } from "../../Language";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  mainWapper: {
    marginTop: hp(3.79),
    marginLeft: wp(5.38),
    marginRight: wp(4.61),
  },
  headerView: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 4,
  },
  headerText: {
    fontSize: RFPercentage(2.9),
    color: COLORS.greyText,
    fontFamily: "Inter_400Regular",
    lineHeight: hp(3.55),
  },
  headerQuestionText: {
    fontSize: RFPercentage(2),
    color: COLORS.greyText,
    fontFamily: "Inter_400Regular",
    lineHeight: hp(2.96),
  },
  otpTextView: {
    flexDirection: "row",
    gap: 25,
    marginHorizontal: wp(4.61),
    marginTop: hp(6.16),
  },
  otpInputView: {
    width: wp(12.82),
    height: wp(12.82),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    textAlign: "center",
    fontSize: RFPercentage(2.7),
  },
  resendMainView: {
    marginHorizontal: wp(4.61),
    marginTop: hp(1.18),
    flexDirection: "row",
  },
  resendText: {
    fontSize: RFPercentage(2.1),
    color: COLORS.primaryNew,
    fontFamily: "Inter_700Bold",
  },
  resendTimeText: {
    fontSize: RFPercentage(2.1),
    fontFamily: "Inter_400Regular",
    paddingLeft: wp(5.12),
    color: COLORS.greyText,
  },
  btnStyle: { marginHorizontal: 0, marginTop: hp(5.33) },
  errorText: {
    color: COLORS.error,
    fontSize: RFPercentage(1.6),
    fontFamily: "Inter_500Medium",
  },
});
const VerifyOTPStep = ({ handleSubmit, timeLeft, handleForgotPassword }) => {
  const currentLanguage = useSelector((state) => state.language.language);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpErr, setOtpErr] = useState(new Array(4).fill(""));
  const textInputRefs = otp.map((_, i) => React.createRef());
  const handleChange = (value, index) => {
    let otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);
    setOtpErr("");
    if (value.length === 1 && index < 3) {
      textInputRefs[index + 1].current.focus();
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <View style={styles.mainWapper}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {translations[currentLanguage].verificationCode}
        </Text>
        <Text style={styles.headerQuestionText}>(?)</Text>
      </View>
      <View style={styles.otpTextView}>
        {otp.map((value, index) => (
          <TextInput
            placeholder="-"
            key={index}
            style={styles.otpInputView}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(value) => handleChange(value, index)}
            autoFocus={index === 0}
            ref={textInputRefs[index]}
            returnKeyType={index === 3 ? "done" : "next"}
            onSubmitEditing={() => {
              if (index < 3) {
                textInputRefs[index + 1].current.focus();
              } else {
                Keyboard.dismiss();
              }
            }}
          />
        ))}
      </View>
      {otpErr && <Text style={styles.errorText}>{otpErr}</Text>}
      <View style={styles.resendMainView}>
        <Pressable
          onPress={() => {
            handleForgotPassword();
          }}
          disabled={timeLeft !== 0}
          style={{
            opacity: timeLeft !== 0 ? 0.5 : 1,
          }}
        >
          <Text style={styles.resendText}>
            {translations[currentLanguage].resend}
          </Text>
        </Pressable>
        {timeLeft !== 0 && (
          <Text style={styles.resendTimeText}>{formatTime(timeLeft)}</Text>
        )}
      </View>
      <CommonButton
        onPress={() => {
          const isValid = otp.some((field) => field === "");
          if (isValid) {
            setOtpErr(translations[currentLanguage].allFieldsAreRequired);
          } else {
            setOtpErr("");
            handleSubmit({ otp: otp.join("") });
          }
        }}
        btnTitle={translations[currentLanguage].next}
        btnContainerStyle={styles.btnStyle}
      />
    </View>
  );
};

export default VerifyOTPStep;
