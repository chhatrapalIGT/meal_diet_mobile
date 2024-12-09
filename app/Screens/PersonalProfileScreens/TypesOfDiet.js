import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import CommonButton from "../../Components/Core/CommonButton";
import { images } from "../../Resource/Images";
import COLORS from "../../constants/colors";
import { getUrl } from "../../Network/url";
import { get, post } from "../../Network/request";
import showToast from "../../Components/Core/CustomTost";
import ListUpdateProfile from "../../Components/ListUpdateProfile";
import { translations } from "../../Language";
import { useSelector } from "react-redux";

// import CommonButton from "../../../Components/Core/CommonButton";
// import { images } from "../../../Resource/Images";
// import COLORS from "../../../constants/colors";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainWelcomeContainer: { flex: 1 },
  welComeBgImg: {
    height: screenHeight,
    width: screenWidth,
  },
  restrictionsMainContainer: {
    flex: 1,
    marginTop: hp(18.13),
  },
  restrictionsMainContent: {
    // flex: 4.962,
    flex: 4.5,
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
    marginTop: hp(18.48),
    marginHorizontal: wp(10.26),
    // marginBottom:20,
    // backgroundColor: 'red',
    height: hp(40),
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
    // marginBottom: hp(2.48),
    marginBottom: hp(3.08),
  },
  dietaryOptionText: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Inter_700Bold",
  },
});
const TypesOfDiet = ({ mainContainerStyle = {}, mainFooterStyle = {} }) => {
 const currentLanguage = useSelector((state) => state.language.language);
  const { navigate } = useNavigation();
  const dietaryRestrictionsOptionsData =[
    { label: translations[currentLanguage].mindGutStudy, value: "Mind-Gut-Study" },
    { label: translations[currentLanguage].standardWeightLoss, value: "Standard-Weight-Loss" },
    { label: translations[currentLanguage].lowCarbohydrate, value: "Low-Carbohydrate" },
    { label: translations[currentLanguage].lowFodmap, value: "Low-Fodmap" },
    { label: translations[currentLanguage].lowNickel, value: "Low-Nickel" },
    { label: translations[currentLanguage].muscleBuilding, value: "Muscle-Building" },
  ]
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState("");
  const [errorTypeOfDiet, setErrorTypeOfDiet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    const url = getUrl("getProfile");
    const res = await get(url);
    const { data } = res.data;
    setSelectedDietaryOptions(data.user.dietType);
  };
  const handleMealButtonPress = (dietaryOption) => {
    setSelectedDietaryOptions(dietaryOption);
    setErrorTypeOfDiet("");
  };
  const handleUpdatedProfile = async () => {
    try {
      setIsLoading(true);
      const payload = {
        dietType: selectedDietaryOptions,
      };
      const url = getUrl("updatedProfile");
      const res = await post(url, payload);
      const { success, message } = res;
      setIsLoading(false);
      if (success) {
        navigate("DietaryRestrictions");
      } else {
        showToast("error", message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", "Internal server error.");
    }
  };
  const handleUpdatedTypeOfDiet = () => {
    if (selectedDietaryOptions === "") {
      setErrorTypeOfDiet("Type of diet is required");
    } else {
      handleUpdatedProfile();
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={styles.mainWelcomeContainer}>
      <ImageBackground
        source={images.signupBGImage} // Use the imported image here
        resizeMode="stretch"
        style={styles.welComeBgImg}
      >
        <ListUpdateProfile
          listLabel={translations[currentLanguage].whatTypeOfDietDoYouHave}
          listsData={dietaryRestrictionsOptionsData}
          handleNext={handleUpdatedTypeOfDiet}
          selectedValue={selectedDietaryOptions}
          handleListItemPress={handleMealButtonPress}
          errorMesaage={errorTypeOfDiet}
          isLoading={isLoading}
          btnText={translations[currentLanguage].next}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TypesOfDiet;
