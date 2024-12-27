import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        height: hp(70),
    },
    closeImageWapper: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: wp(6.41),
        marginTop: hp(2.36),
    },
    closeImage: { width: 25.33, height: 29.16 },
    container: {
        // flex: 1,
        // backgroundColor: '#f8f9fa',
        padding: 16,
    },
    title: {
        fontSize: 24,
        // fontWeight: 'bold',
        fontFamily: 'Inter_700Bold',
        marginBottom: 8,
        color: '#343a40',
    },
    subtitle: {
        fontSize: 18,
        // fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 16,
        color: '#495057',
    },
    paragraph: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
        color: '#6c757d',
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    tipNumber: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        marginRight: 8,
        color: '#495057',
    },
    tipText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#6c757d',
        flex: 1,
        fontFamily: 'Inter_400Regular',
    },
});


const SOSComponent = ({ handleClose }) => {
    const currentLanguage = useSelector((state) => state.language.language);
    const tips = [
        { text1: `${translations[currentLanguage].tipTextBold1} `, text2: `${translations[currentLanguage].tipTextLight1}` },
        { text1: `${translations[currentLanguage].tipTextBold2} `, text2: `${translations[currentLanguage].tipTextLight2}` },
        { text1: `${translations[currentLanguage].tipTextBold3} `, text2: `${translations[currentLanguage].tipTextLight3}` },
        { text1: `${translations[currentLanguage].tipTextBold4} `, text2: `${translations[currentLanguage].tipTextLight4}` },
        { text1: `${translations[currentLanguage].tipTextBold5} `, text2: `${translations[currentLanguage].tipTextLight5}` },
        { text1: `${translations[currentLanguage].tipTextBold6} `, text2: `${translations[currentLanguage].tipTextLight6}` },
        { text1: `${translations[currentLanguage].tipTextBold7} `, text2: `${translations[currentLanguage].tipTextLight7}` },
        { text1: `${translations[currentLanguage].tipTextBold8} `, text2: `${translations[currentLanguage].tipTextLight8}` },
        { text1: `${translations[currentLanguage].tipTextBold9} `, text2: `${translations[currentLanguage].tipTextLight9}` },
        { text1: `${translations[currentLanguage].tipTextBold10}`, text2: ` ${translations[currentLanguage].tipTextLight10}` },
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
                </View>
                <View
                    style={{
                        width: wp(94.88),
                        height: hp(61)
                        // marginTop: 74,
                        // justifyContent: "center",
                        // alignItems: "center",
                    }}
                >
                    {/* <View>
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
                    </View> */}
                    <ScrollView style={styles.container}>
                        <Text style={styles.title}>{translations[currentLanguage].title}</Text>
                        <Text style={styles.subtitle}>
                            {translations[currentLanguage].subtitle}
                        </Text>
                        <Text style={styles.paragraph}>
                            {translations[currentLanguage].topPara1}
                        </Text>
                        <Text style={styles.paragraph}>
                            {translations[currentLanguage].topPara2}
                        </Text>
                        {tips.map((tip, index) => (
                            <View key={index} style={styles.tipContainer}>
                                <Text style={styles.tipNumber}>{index + 1}.</Text>
                                <Text style={styles.tipText}><Text style={{ fontFamily: 'Inter_700Bold', color: '#000' }}>{tip.text1}</Text>{tip.text2}</Text>
                            </View>
                        ))}
                        <Text style={styles.paragraph}>
                            {translations[currentLanguage].bottomPara1}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default SOSComponent;
