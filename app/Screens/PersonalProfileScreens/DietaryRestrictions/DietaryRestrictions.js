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
import CommonButton from "../../../Components/Core/CommonButton";
import { images } from "../../../Resource/Images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { getUrl } from "../../../Network/url";
import { get, post } from "../../../Network/request";
import showToast from "../../../Components/Core/CustomTost";
import { useSelector } from "react-redux";
import { translations } from "../../../Language";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainWelcomeContainer: { flex: 1 },
  welComeBgImg: {
    height: screenHeight,
    width: screenWidth,
  },
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

const Index = ({ mainContainerStyle = {}, mainFooterStyle = {} }) => {
  const { navigate, goBack } = useNavigation();
  const [isSelectedDietaryRestriction, setIsSelectedDietaryRestriction] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentLanguage = useSelector((state) => state.language.language);


  const getProfile = async () => {
    const url = getUrl("getProfile");
    const res = await get(url);
    const { data } = res.data;
    if (data.user.isDietaryRestrictions) {
      setIsSelectedDietaryRestriction("Yes");
    } else {
      setIsSelectedDietaryRestriction("No");
    }
  };
  const handleRestrictionData = async () => {
    try {
      setIsLoading(true);
      const payload = {
        isDietaryRestrictions: isSelectedDietaryRestriction === "Yes",
      };
      const url = getUrl("updatedProfile");
      const res = await post(url, payload);
      const { success, data, message } = res;
      setIsLoading(false);
      if (success) {
        if (data.updatedUser.isDietaryRestrictions) {
          navigate("DietaryRestrictionsOptions");
        } else {
          // navigate("Language", { firstTime: false });
          navigate("HomeTabs", {
            screen: "Settings",
          });
        }
      } else {
        showToast("error", message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", translations[currentLanguage].internalServerError);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
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
    <SafeAreaView style={styles.mainWelcomeContainer}>
      <ImageBackground
        source={images.signupBGImage} // Use the imported image here
        resizeMode="stretch"
        style={styles.welComeBgImg}
      >
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
                  setIsSelectedDietaryRestriction("Yes");
                }}
                title={translations[currentLanguage].yes}
                btnWapperStyle={{
                  backgroundColor:
                    isSelectedDietaryRestriction === "Yes"
                      ? COLORS.active
                      : COLORS.white,
                }}
                titleStyle={{
                  color:
                    isSelectedDietaryRestriction === "Yes"
                      ? COLORS.white
                      : COLORS.greyText,
                }}
              />
              <RestrictionSButton
                handleOnPress={() => {
                  setIsSelectedDietaryRestriction("No");
                }}
                title={translations[currentLanguage].no}
                btnWapperStyle={{
                  backgroundColor:
                    isSelectedDietaryRestriction === "No"
                      ? COLORS.active
                      : COLORS.white,
                }}
                titleStyle={{
                  color:
                    isSelectedDietaryRestriction === "No"
                      ? COLORS.white
                      : COLORS.greyText,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1.038,
              // justifyContent: "flex-end",
              // backgroundColor:'red',
              ...mainFooterStyle,
            }}
          >
            <CommonButton
              btnTitle={translations[currentLanguage].next}
              disabled={isLoading}
              onPress={handleRestrictionData}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Index;
