import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../constants/colors";
import { images } from "../Resource/Images";
import { TouchableOpacity } from "react-native";
import CommonButton from "./Core/CommonButton";
import { useSelector } from "react-redux";
import { translations } from "../Language";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768 && screenHeight >= 768;
const styles = StyleSheet.create({
  mainWelcomeContainer: { flex: 1 },
  welComeBgImg: {
    height: screenHeight,
    width: screenWidth,
    // alignItems: "center",
  },
  middleContentMainView: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    // flex: isTablet ? 4 : 4.4,
    marginTop: hp(25.36),
    // backgroundColor: "green",
  },
  logoIconView: {
    height: isTablet ? wp(19) : wp(31),
    width: isTablet ? wp(15.62) : wp(25.55),
  },
  logoImg: {
    height: "100%",
    width: "100%",
  },
  appTitleText: {
    textAlign: "center",
    fontSize: RFPercentage(5.3),
    fontFamily: "PaytoneOne_400Regular",
    color: COLORS.greyText,
  },
  appSubTitleText: {
    textAlign: "center",
    fontSize: RFPercentage(2.9),
    fontFamily: "Inter_300Light",
    color: COLORS.greyText,
  },
  bottomContent: {
    width: "100%",
    marginTop: hp(6.75),
  },
  dietaryOptionMainView: {
    marginHorizontal: wp(10.26),
  },
  dietaryOptionSelectedView: {
    paddingVertical: 10,
    paddingHorizontal: wp(5.38),
    borderRadius: 10,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: hp(3.08),
  },
  dietaryOptionText: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Inter_700Bold",
    paddingLeft: 12,
  },
});
const LanguageComponent = ({
  handleNext,
  isLoading = false,
  selectedValue = "",
  bottomContentCustomStyle = {},
  handleSelectValue,
}) => {
  const currentLanguage = useSelector((state) => state.language.language);
  return (
    <View style={{ height: hp(100) }}>
      <View style={styles.middleContentMainView}>
        <View style={styles.logoIconView}>
          <Image
            source={images.logo}
            resizeMode="cover"
            style={styles.logoImg}
          />
        </View>
        <View>
          <Text style={styles.appTitleText}>Mind Diet</Text>
        </View>
      </View>
      <View style={{ ...styles.bottomContent, ...bottomContentCustomStyle }}>
        <View style={styles.dietaryOptionMainView}>
          {[
            {
              name: "English",
              value: "English",
              icon: images.usLanguageIcon,
              shortName: "en",
            },
            {
              name: "Svenska",
              value: "Swedish",
              icon: images.swedishLanguageIcon,
              shortName: "sv",
            },
            {
              name: "Italiano",
              value: "Italian",
              icon: images.italianLanguageIcon,
              shortName: "it",
            },
          ].map((list, index) => {
            return (
              <View key={`list-${index}`}>
                <TouchableOpacity
                  key={`list-${index}`}
                  onPress={() => handleSelectValue(list.value, list.shortName)}
                  style={{
                    ...styles.dietaryOptionSelectedView,
                    backgroundColor:
                      selectedValue === list.value
                        ? COLORS.active
                        : COLORS.white,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image source={list.icon} style={{ width: 41, height: 39 }} />
                  <Text
                    style={{
                      ...styles.dietaryOptionText,
                      color:
                        selectedValue === list.value
                          ? COLORS.white
                          : COLORS.greyText,
                    }}
                  >
                    {list.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <CommonButton
          btnTitle= {translations[currentLanguage].next}
          disabled={isLoading}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default LanguageComponent;
