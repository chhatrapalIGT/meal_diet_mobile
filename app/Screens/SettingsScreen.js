import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { images } from "../Resource/Images";
import CustomInput from "../Components/Core/CustomInput";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, post } from "../Network/request";
import { getUrl } from "../Network/url";
import { useSelector } from "react-redux";
import { translations } from "../Language";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  mainWelcomeContainer: {
    flex: 1,
  },
  welComeBgImg: {
    height: screenHeight,
    width: screenWidth,
  },
  mainConatinerView: {
    height: hp(100),
    justifyContent: "center",
    marginHorizontal: wp(9.23),
  },
  logoAndEmailView: {
    alignItems: "center",
    marginHorizontal: wp(0.76),
  },
  logoImage: { width: 97.64, height: 119 },
  inputWapper: { paddingHorizontal: wp(9.23) },
  settingMainView: { marginTop: hp(7.81) },
  settingHeaderText: {
    color: COLORS.greyText,
    fontSize: RFPercentage(3.4),
    fontFamily: "Inter_300Light",
  },
  settingMenuWapper: { marginTop: hp(3.31), marginLeft: wp(3.58) },
  menuItemView: { marginBottom: hp(2.6) },
  menuText: {
    color: COLORS.greyText,
    fontSize: RFPercentage(1.9),
    fontFamily: "Inter_500Medium",
    textDecorationLine: "underline",
  },
  emailIcon: { width: 20, height: 15, marginLeft: 4 },
});
const SettingsScreen = () => {
  const currentLanguage = useSelector((state) => state.language.language);
  const { navigate } = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const getProfile = async () => {
    const url = getUrl("getProfile");
    const res = await get(url);
    const { data } = res.data;
    setProfileData(data.user);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={styles.mainWelcomeContainer}>
      <ImageBackground
        source={images.homeTabBG}
        resizeMode="stretch"
        style={styles.welComeBgImg}
      >
        <View style={styles.mainConatinerView}>
          <View style={styles.logoAndEmailView}>
            <Image source={images.logo} style={styles.logoImage} />
            <CustomInput
              leftIconName={images.mailIcon}
              leftIconStyles={styles.emailIcon}
              value={profileData?.email || ""}
              inputCustomWrapper={styles.inputWapper}
              readOnly={true}
            />
          </View>
          <View style={styles.settingMainView}>
            <Text style={styles.settingHeaderText}>
              {translations[currentLanguage].settings}
            </Text>
            <View style={styles.settingMenuWapper}>
              <Pressable style={styles.menuItemView} disabled>
                <Text style={{...styles.menuText, opacity:0.3}}>
                  {translations[currentLanguage].accountSettings}
                </Text>
              </Pressable>
              <Pressable
                style={styles.menuItemView}
                onPress={() => navigate("TermsAndConditions")}
              >
                <Text style={styles.menuText}>
                  {translations[currentLanguage].termsAndConditionText}
                </Text>
              </Pressable>
              <Pressable
                style={styles.menuItemView}
                onPress={() => navigate("ChangePassowrd")}
              >
                <Text style={styles.menuText}>
                  {translations[currentLanguage].chnagePassword}
                </Text>
              </Pressable>
              <Pressable
                style={styles.menuItemView}
                onPress={() => navigate("MealListing")}
              >
                <Text style={styles.menuText}>
                  {translations[currentLanguage].updateYourMeals}
                </Text>
              </Pressable>
              <Pressable
                style={styles.menuItemView}
                onPress={() => navigate("Language", { firstTime: false })}
              >
                <Text style={styles.menuText}>
                  {translations[currentLanguage].updatedYourInformation}
                </Text>
              </Pressable>
              <Pressable
                style={styles.menuItemView}
                onPress={() => {
                  AsyncStorage.removeItem("userToken");
                  AsyncStorage.removeItem("selectedMeal");
                  navigate("Welcome");
                }}
              >
                <Text
                  style={{
                    ...styles.menuText,
                    color: COLORS.Red,
                  }}
                >
                  {translations[currentLanguage].logOut}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SettingsScreen;
