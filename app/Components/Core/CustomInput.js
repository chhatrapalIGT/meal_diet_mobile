import React from "react";
import { Image, TextInput, View, TouchableOpacity } from "react-native";
import COLORS from "../../constants/colors";

const CustomInput = ({
    leftIconName = "",
    rightIconName = "",
    leftIconStyles,
    rightIconStyle,
    placeholder = "",
    onChangeText,
    keyboardType,
    returnKeyType,
    secureTextEntry = false,
    rightIconClick,
    value,
    inputCustomWrapper,
    readOnly=false
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: COLORS.black,
                marginBottom: 10,
                marginTop: 32,
                height: 30,
                ...inputCustomWrapper
            }}
        >
            {leftIconName && (
                <Image
                    source={leftIconName}
                    style={{
                        width: 25,
                        height: 25,
                        ...leftIconStyles,
                    }}
                />
            )}
            <TextInput
                // {...props}
                style={{
                    flex: 1,
                    fontSize: 14,
                    marginLeft: 10,
                    fontFamily: "Inter_400Regular",
                }}
                placeholder={placeholder}
                placeholderTextColor={COLORS.black}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                value={value}
                readOnly={readOnly}
            />
            {rightIconName && (
                <TouchableOpacity onPress={rightIconClick}>
                    <Image
                        source={rightIconName}
                        style={{
                            width: 25,
                            height: 25,
                            ...rightIconStyle,
                        }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomInput;
