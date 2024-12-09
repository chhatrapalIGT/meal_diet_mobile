import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../Resource/Images";
import COLORS from "../../../constants/colors";
import { getUrl } from "../../../Network/url";
import { get, post } from "../../../Network/request";
import ListUpdateProfile from "../../../Components/ListUpdateProfile";
import { translations } from "../../../Language";
import { useSelector } from "react-redux";

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
    marginTop: hp(18.48),
    marginHorizontal: wp(10.26),
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
    marginBottom: hp(3.08),
  },
  dietaryOptionText: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Inter_700Bold",
  },
});
const DietaryRestrictionsOptions = () => {
 const currentLanguage = useSelector((state) => state.language.language);
  const { navigate } = useNavigation();
  const dietaryRestrictionsOptionsData = [
    { label: translations[currentLanguage].glutenFree, value: "GlutenFree" },
    { label: translations[currentLanguage].lactoseFree, value: "LactoseFree" },
    {
      label: translations[currentLanguage].lactoOvoVegetarian,
      value: "LactoOvoVegetarian",
    },
    { label: translations[currentLanguage].vegan, value: "Vegan" },
    { label: translations[currentLanguage].ovoVegetarian, value: "OvoVegetarian" },
    { label: translations[currentLanguage].lactoVegetarian, value: "LactoVegetarian" },

  ]
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    const url = getUrl("getProfile");
    const res = await get(url);
    const { data } = res.data;
    setSelectedDietaryOptions(data.user.dietaryRestrictions);
  };
  const handleDietaryOptions = async () => {
    try {
      setIsLoading(true);
      const payload = {
        dietaryRestrictions: selectedDietaryOptions,
      };
      const url = getUrl("updatedProfile");
      const res = await post(url, payload);
      const { success, data, message } = res;
      setIsLoading(false);
      if (success) {
        navigate("Language");
      } else {
        showToast("error", message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", "Internal server error.");
    }
  };
  const handleMealButtonPress = (dietaryOption) => {
    if (selectedDietaryOptions.includes(dietaryOption)) {
      const filterData = selectedDietaryOptions.filter(
        (item) => item !== dietaryOption
      );
      setSelectedDietaryOptions(filterData);
    } else {
      setSelectedDietaryOptions([...selectedDietaryOptions, dietaryOption]);
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
          listsData={dietaryRestrictionsOptionsData}
          selectedValue={selectedDietaryOptions}
          handleListItemPress={handleMealButtonPress}
          handleNext={handleDietaryOptions}
          isMultiSelection={true}
          isLoading={isLoading}
          listLabel={translations[currentLanguage].whatDietaryRestrictionsDoYouHave}
          btnText={translations[currentLanguage].next}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DietaryRestrictionsOptions;
