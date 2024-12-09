import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../Resource/Images";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../../constants/colors";
import { useSelector } from "react-redux";
import { translations } from "../../Language";

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
        height: hp(44.2),
    },
    closeImageWapper: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: wp(6.41),
        marginTop: hp(2.36),
    },
    closeImage: { width: 25.33, height: 29.16 },
});

const SOSComponent = ({ handleClose }) => {
  const currentLanguage = useSelector((state) => state.language.language);

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
                </View>
                <View
                    style={{
                        width: wp(94.88),
                        marginTop: 74,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View>
                        <Image
                            source={images.activeSosIcon}
                            style={{ width: 73, height: 73 }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 23,
                            borderBottomColor: "#E2DDDD",
                            borderBottomWidth: 1,
                            width: "90%",
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 22,
                                fontFamily: "Inter_400Regular",
                                color: COLORS.greyText,
                            }}
                        >
                            {translations[currentLanguage].sosMessage}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SOSComponent;
