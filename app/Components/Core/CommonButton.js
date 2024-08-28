import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../../constants/colors";

const CommonButton = ({
    btnTitle,
    onPress,
    btnContainerStyle,
    btnTextStyle,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={{
                opacity: disabled ? 0.5 : 1,
                backgroundColor: COLORS.primaryNew,
                paddingVertical: hp(2),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: wp(10.4),
                borderRadius: 10,
                ...btnContainerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    textAlign: "center",
                    fontSize: RFPercentage(2.9),
                    fontFamily: "Inter_700Bold",
                    color: COLORS.white,
                    ...btnTextStyle,
                }}
            >
                {btnTitle}
            </Text>
        </TouchableOpacity>
    );
};

export default CommonButton;
