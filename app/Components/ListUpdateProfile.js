import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../constants/colors";
import CommonButton from "./Core/CommonButton";

const styles = StyleSheet.create({
  restrictionsMainContainer: {
    flex: 1,
    marginTop: hp(18.13),
  },
  restrictionsMainContent: {
    flex: 4.962,
  },
  restrictionsTitleView: {
    marginLeft: wp(8.72),
    marginRight: wp(5.38),
  },
  restrictionsTitleText: {
    fontSize: RFPercentage(2.9),
    fontFamily: "Inter_300Light",
  },
  dietaryOptionMainView: {
    marginTop: hp(15.48),
    marginHorizontal: wp(10.26),
    height: hp(45),
  },
  dietaryOptionSelectedView: {
    paddingVertical: hp(2.13),
    paddingHorizontal: wp(5.38),
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  dietaryOptionText: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Inter_700Bold",
  },
});
const TypeOfDietComponent = ({
  mainContainerStyle = {},
  selectedValue = "",
  listsData = [],
  errorMesaage = "",
  mainFooterStyle = {},
  handleNext,
  isLoading = false,
  handleListItemPress,
  isMultiSelection = false,
  listLabel = "",
  btnText=''
}) => {
  return (
    <View
      style={{
        ...styles.restrictionsMainContainer,
        ...mainContainerStyle,
      }}
    >
      <View style={styles.restrictionsMainContent}>
        <View style={styles.restrictionsTitleView}>
          <Text style={styles.restrictionsTitleText}>
            {listLabel}
          </Text>
        </View>
        <View style={styles.dietaryOptionMainView}>
          <ScrollView>
            {listsData.map((list, index) => {
              return (
                <View key={`list-${index}`}>
                  <TouchableOpacity
                    key={`list-${index}`}
                    onPress={() => handleListItemPress(list.value)}
                    style={{
                      ...styles.dietaryOptionSelectedView,
                      backgroundColor: isMultiSelection
                        ? selectedValue.includes(list.value)
                          ? COLORS.active
                          : COLORS.white
                        : selectedValue === list.value
                        ? COLORS.active
                        : COLORS.white,
                      marginBottom:
                        index === listsData.length - 1 ? 0 : hp(3.08),
                    }}
                  >
                    <Text
                      style={{
                        ...styles.dietaryOptionText,
                        color: isMultiSelection
                          ? selectedValue.includes(list.value)
                            ? COLORS.white
                            : COLORS.greyText
                          : selectedValue === list.value
                          ? COLORS.white
                          : COLORS.greyText,
                      }}
                    >
                      {list.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <Text style={{ color: "red" }}>{errorMesaage}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1.038,
          ...mainFooterStyle,
        }}
      >
        <CommonButton
          btnTitle={btnText}
          onPress={handleNext}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default TypeOfDietComponent;
