import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../constants/colors";
import CommonButton from "./Core/CommonButton";
import { translations } from "../Language";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  // mainWelcomeContainer: { flex: 1 },
  // welComeBgImg: {
  //   height: screenHeight,
  //   width: screenWidth,
  // },
  restrictionsMainContainer: { flex: 1, marginTop: hp(21.56) },
  restrictionsMainContent: {
    flex: 4.962,
    marginHorizontal: 34,
  },
  restrictionsTitleView: {},
  restrictionsTitleText: {
    fontSize: 22,
    fontFamily: "Inter_300Light",
  },
  restrictionsButtonMainView: {
    backgroundColor: COLORS.white,
    flex: 3,
    // paddingVertical: hp(4.73),
    paddingVertical: hp(7.7),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  restrictionsBtnText: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Inter_700Bold",
  },
});

const DietaryRestrictionComponent = ({
  mainContainerStyle = {},
  mainFooterStyle = {},
  selectedValue,
  isLoading = false,
  handleSelectOption,
  handleNext,
}) => {
  const currentLanguage = useSelector((state) => state.language.language);
  const RestrictionSButton = ({
    handleOnPress,
    title,
    btnWapperStyle,
    titleStyle,
  }) => {
    
    return (
      <TouchableOpacity
        onPress={handleOnPress}
        style={{
          ...styles.restrictionsButtonMainView,
          ...btnWapperStyle,
        }}
      >
        <Text
          style={{
            ...styles.restrictionsBtnText,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{ ...styles.restrictionsMainContainer, ...mainContainerStyle }}
    >
      <View style={styles.restrictionsMainContent}>
        <View style={styles.restrictionsTitleView}>
          <Text style={styles.restrictionsTitleText}>
            {translations[currentLanguage].doYouHaveAnyDietaryRestriction}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            marginTop: hp(14.81),
          }}
        >
          <RestrictionSButton
            handleOnPress={() => {
              handleSelectOption("Yes");
            }}
            title={translations[currentLanguage].yes}
            btnWapperStyle={{
              backgroundColor:
                selectedValue === "Yes" ? COLORS.active : COLORS.white,
            }}
            titleStyle={{
              color: selectedValue === "Yes" ? COLORS.white : COLORS.greyText,
            }}
          />
          <RestrictionSButton
            handleOnPress={() => {
              handleSelectOption("No");
            }}
            title={translations[currentLanguage].no}
            btnWapperStyle={{
              backgroundColor:
                selectedValue === "No" ? COLORS.active : COLORS.white,
            }}
            titleStyle={{
              color: selectedValue === "No" ? COLORS.white : COLORS.greyText,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1.038,
          ...mainFooterStyle,
        }}
      >
        <CommonButton
          btnTitle={translations[currentLanguage].next}
          disabled={isLoading}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default DietaryRestrictionComponent;
