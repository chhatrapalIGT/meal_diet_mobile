import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { images } from "../../Resource/Images";
import COLORS from "../../constants/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import VerifyEmailStep from "./VerifyEmailStep";
import VerifyOTPStep from "./VerifyOTPStep";
import ChangePasswordStep from "./ChangePasswordStep";
import { getUrl } from "../../Network/url";
import { post } from "../../Network/request";
import showToast from "../Core/CustomTost";
import { translations } from "../../Language";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalMainContent: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeImageWapper: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: wp(6.41),
        marginTop: hp(2.36),
    },
    closeImage: { width: 25.33, height: 29.16 },
    dotMainView: {
        marginTop: hp(4.85),
        marginBottom: hp(4.38),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

const index = ({ handleClose }) => {
    const currentLanguage = useSelector((state) => state.language.language);
    // Create references for the OTP inputs
    const [activeSlide, setActiveSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isOptSendSuccess, setIsOptSendSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassData, setForgotPassData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const handleForgotPassword = async (type, payload) => {
        if (type === "sendOtp") {
            setIsLoading(true);
            try {
                const url = getUrl("forgot-password");
                const res = await post(url, payload);
                const { success, message } = res;
                if (success) {
                    setActiveSlide(1);
                    setIsOptSendSuccess(true);
                    setTimeLeft(120);
                    showToast("success", message);
                    setIsLoading(false);
                } else {
                    setIsOptSendSuccess(false);
                    handleClose();
                    showToast("error", message);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsOptSendSuccess(false);
                handleClose();
                showToast("error", translations[currentLanguage].internalServerError, error);
                setIsLoading(false);
            }
        } else if (type === "resetPass") {
            setIsLoading(true);
            // const payload = {
            //     email: email.toLowerCase(),
            //     otp: otp,
            //     newPassword: password,
            //     confirmPassword: confirmPassword,
            // };
            try {
                const url = getUrl("reset-password");
                const res = await post(url, payload);
                const { success, message } = res;
                if (success) {
                    handleClose();
                    showToast("success", message);
                    setIsLoading(false);
                } else {
                    handleClose();
                    showToast("error", message);
                    setIsLoading(false);
                }
            } catch (error) {
                handleClose();
                showToast("error", translations[currentLanguage].internalServerError, error);
                setIsOptSendSuccess(false);
                setIsLoading(false);
            }
        }
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
    const stepsData = [
        {
            id: 1,
            component: (
                <VerifyEmailStep
                    isLoading={isLoading}
                    handleSubmit={(data) => {
                        setForgotPassData({ ...forgotPassData, ...data });
                        handleForgotPassword("sendOtp", data);
                    }}
                />
            ),
        },
        {
            id: 2,
            component: (
                <VerifyOTPStep
                    handleSubmit={(data) => {
                        setForgotPassData({ ...forgotPassData, ...data });
                        setActiveSlide(2);
                    }}
                    timeLeft={timeLeft}
                    handleForgotPassword={() =>
                        handleForgotPassword("sendOtp", {
                            email: forgotPassData.email,
                        })
                    }
                />
            ),
        },
        {
            id: 3,
            component: (
                <ChangePasswordStep
                    handleSubmit={(data) => {
                        setForgotPassData({ ...forgotPassData, ...data });
                        handleForgotPassword("resetPass", {
                            ...forgotPassData,
                            ...data,
                        });
                    }}
                />
            ),
        },
    ];

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.modalMainContent}>
                <View style={{ width: wp(94.88) }}>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.closeImageWapper}
                    >
                        <Image
                            source={images.closeIcon}
                            style={styles.closeImage}
                        />
                    </TouchableOpacity>
                    {stepsData.map((step, index) => {
                        return (
                            <>
                                {activeSlide === index && (
                                    <>
                                        {activeSlide === index
                                            ? step.component
                                            : null}
                                    </>
                                )}
                            </>
                        );
                    })}

                    <View style={styles.dotMainView}>
                        {stepsData.map((_, index) => {
                            return (
                                <View
                                    key={`dot-${index}`}
                                    style={{
                                        ...styles.dot,
                                        backgroundColor:
                                            activeSlide === index
                                                ? COLORS.active
                                                : "#D9D9D9",
                                    }}
                                />
                            );
                        })}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default index;
