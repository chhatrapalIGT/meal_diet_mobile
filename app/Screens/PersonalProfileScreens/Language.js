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
import { images } from "../../Resource/Images";
import COLORS from "../../constants/colors";
import { TouchableOpacity } from "react-native";
import CommonButton from "../../Components/Core/CommonButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUrl } from "../../Network/url";
import { get, post } from "../../Network/request";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/Slices/languageSlice";
import { translations } from "../../Language";
import LanguageComponent from "../../Components/LanguageComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    // flex: isTablet ? 2 : 1.6,
    marginTop: hp(6.75),
    // backgroundColor: "red",
  },
  dietaryOptionMainView: {
    // marginTop: hp(18.48),
    marginHorizontal: wp(10.26),
  },
  dietaryOptionSelectedView: {
    // paddingVertical: hp(2.13),
    paddingVertical: 10,
    paddingHorizontal: wp(5.38),
    borderRadius: 10,
    // justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    // marginBottom: hp(2.48),
    marginBottom: hp(3.08),
  },
  dietaryOptionText: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Inter_700Bold",
    paddingLeft: 12,
  },
});
const Language = () => {
  const route = useRoute();
  const { firstTime } = route.params;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMealButtonPress = (dietaryOption, lang) => {
    setSelectedDietaryOptions(dietaryOption);
  };
  const getProfile = async () => {
    const url = getUrl("getProfile");
    const res = await get(url);
    const { data } = res.data;
    setSelectedDietaryOptions(data.user.languagePreference);
  };
  const handleLanguageUpdate = async () => {
    if (firstTime) {
      if (selectedDietaryOptions === "Italian") {
        dispatch(setLanguage("it"));
        AsyncStorage.setItem("lang", "it");
      } else if (selectedDietaryOptions === "Swedish") {
        dispatch(setLanguage("sv"));
        AsyncStorage.setItem("lang", "sv");
      } else if (selectedDietaryOptions === "English") {
        dispatch(setLanguage("en"));
        AsyncStorage.setItem("lang", "en");
      }
      navigate("Welcome");
    } else {
      try {
        setIsLoading(true);
        const payload = {
          languagePreference: selectedDietaryOptions,
        };
        const url = getUrl("updatedProfile");
        const res = await post(url, payload);
        const { success, data, message } = res;
        setIsLoading(false);
        if (success) {
          if (data.updatedUser.languagePreference === "Italian") {
            dispatch(setLanguage("it"));
            AsyncStorage.setItem("lang", "it");
          } else if (data.updatedUser.languagePreference === "Swedish") {
            dispatch(setLanguage("sv"));
            AsyncStorage.setItem("lang", "sv");
          } else if (data.updatedUser.languagePreference === "English") {
            dispatch(setLanguage("en"));
            AsyncStorage.setItem("lang", "en");
          }
          navigate("HomeTabs", {
            screen: "Settings",
          });
        } else {
          showToast("error", message);
        }
      } catch (error) {
        setIsLoading(false);
        showToast("error", "Internal server error.");
      }
    }
  };
  const handleSetLanguage = async () => {
    const localStoreLang = await AsyncStorage.getItem("lang");    
    if (localStoreLang) {
      dispatch(setLanguage(localStoreLang));
      navigate("Welcome")
    } 
    // else {
    //   const { country, language } = getCountryLanguage(); // Get the country code
    //   const localLanguage = getLocalLanguage(country);
    //   dispatch(setLanguage(localLanguage));
    // }
  };
  useEffect(() => {
    if (firstTime) {
      handleSetLanguage()
    }else{
      getProfile()
    }
  }, []);
  return (
    <SafeAreaView style={styles.mainWelcomeContainer}>
      <ImageBackground
        source={images.signupBGImage} // Use the imported image here
        resizeMode="stretch"
        style={styles.welComeBgImg}
      >
        <LanguageComponent
          handleSelectValue={handleMealButtonPress}
          selectedValue={selectedDietaryOptions}
          handleNext={handleLanguageUpdate}
          isLoading={isLoading}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Language;
