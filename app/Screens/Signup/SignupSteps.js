import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { images } from "../../Resource/Images";
import { SafeAreaView } from "react-native";
import COLORS from "../../constants/colors";
import GenderComponent from "../../Components/GenderComponent";
import SelectMeal from "../../Components/SelectMeal";
import { useNavigation, useRoute } from "@react-navigation/native";
import TermsAndCondition from "../../Components/TermsAndCondition";
import { getUrl } from "../../Network/url";
import { post } from "../../Network/request";
import showToast from "../../Components/Core/CustomTost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListUpdateProfile from "../../Components/ListUpdateProfile";
import DietaryRestrictionComponent from "../../Components/DietaryRestrictionComponent";
import LanguageComponent from "../../Components/LanguageComponent";
import { setLanguage } from "../../store/Slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../../Language";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  mainWelcomeContainer: { flex: 1 },
  welComeBgImg: {
    height: screenHeight,
    width: screenWidth,
  },
  container: {
    flex: 1,
    width: wp(100),
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

const SignupSteps = () => {
  const currentLanguage = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { userData } = route.params || "";
  const [activeSlide, setActiveSlide] = useState(0);
  const [stepsSignupData, setStepsSignupData] = useState({
    gender: "",
    selectedMeals: [],
    isTermAndCondition: false,
    dietType: "",
    dietTypeErr: "",
    isSelectedDietaryRestriction: false,
    dietaryRestrictions: [],
    languagePreference: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const stepsData = [
    {
      id: 1,
      component: (
        <GenderComponent
          handleSelectGender={(gender) => {
            setActiveSlide(1);
            setStepsSignupData({
              ...stepsSignupData,
              gender: gender,
            });
          }}
        />
      ),
    },
    {
      id: 2,
      component: (
        <SelectMeal
          handleSelectMeal={(selectedMeals) => {
            setStepsSignupData({
              ...stepsSignupData,
              selectedMeals: selectedMeals,
            });
            setActiveSlide(2);
          }}
        />
      ),
    },
    {
      id: 3,
      component: (
        <ListUpdateProfile
          listsData={[
            {
              label: translations[currentLanguage].mindGutStudy,
              value: "Mind-Gut-Study",
            },
            {
              label: translations[currentLanguage].standardWeightLoss,
              value: "Standard-Weight-Loss",
            },
            {
              label: translations[currentLanguage].lowCarbohydrate,
              value: "Low-Carbohydrate",
            },
            {
              label: translations[currentLanguage].lowFodmap,
              value: "Low-Fodmap",
            },
            {
              label: translations[currentLanguage].lowNickel,
              value: "Low-Nickel",
            },
            {
              label: translations[currentLanguage].muscleBuilding,
              value: "Muscle-Building",
            },
          ]}
          handleNext={() => {
            if (stepsSignupData.dietType !== "") {
              setActiveSlide(3);
            } else {
              setStepsSignupData({
                ...stepsSignupData,
                dietTypeErr: "Type of diet is required",
              });
            }
          }}
          selectedValue={stepsSignupData.dietType}
          handleListItemPress={(value) => {
            setStepsSignupData({
              ...stepsSignupData,
              dietType: value,
              dietTypeErr: "",
            });
          }}
          listLabel={translations[currentLanguage].whatTypeOfDietDoYouHave}
          errorMesaage={stepsSignupData.dietTypeErr}
          mainFooterStyle={{ flex: 1.4, justifyContent: "flex-end" }}
          mainContainerStyle={{ flex: 4.6 }}
          btnText={translations[currentLanguage].next}
        />
      ),
    },
    {
      id: 4,
      component: (
        <DietaryRestrictionComponent
          handleNext={() => {
            setActiveSlide(4);
          }}
          selectedValue={
            stepsSignupData.isSelectedDietaryRestriction ? "Yes" : "No"
          }
          handleSelectOption={(value) => {
            setStepsSignupData({
              ...stepsSignupData,
              isSelectedDietaryRestriction: value === "Yes",
            });
          }}
          mainFooterStyle={{ flex: 1.4, justifyContent: "flex-end" }}
          mainContainerStyle={{ flex: 4.6 }}
        />
      ),
    },
    ...(stepsSignupData.isSelectedDietaryRestriction
      ? [
          {
            id: 5,
            component: (
              <ListUpdateProfile
                listLabel={
                  translations[currentLanguage].whatDietaryRestrictionsDoYouHave
                }
                listsData={[
                  {
                    label: translations[currentLanguage].glutenFree,
                    value: "GlutenFree",
                  },
                  {
                    label: translations[currentLanguage].lactoseFree,
                    value: "LactoseFree",
                  },
                  {
                    label: translations[currentLanguage].lactoOvoVegetarian,
                    value: "LactoOvoVegetarian",
                  },
                  {
                    label: translations[currentLanguage].vegan,
                    value: "Vegan",
                  },
                  {
                    label: translations[currentLanguage].ovoVegetarian,
                    value: "OvoVegetarian",
                  },
                  {
                    label: translations[currentLanguage].lactoVegetarian,
                    value: "LactoVegetarian",
                  },
                ]}
                handleNext={() => {
                  setActiveSlide(5);
                }}
                selectedValue={stepsSignupData.dietaryRestrictions}
                handleListItemPress={(value) => {
                  if (stepsSignupData.dietaryRestrictions.includes(value)) {
                    const filterData =
                      stepsSignupData.dietaryRestrictions.filter(
                        (item) => item !== value
                      );
                    setStepsSignupData({
                      ...stepsSignupData,
                      dietaryRestrictions: filterData,
                    });
                  } else {
                    setStepsSignupData({
                      ...stepsSignupData,
                      dietaryRestrictions: [
                        ...stepsSignupData.dietaryRestrictions,
                        value,
                      ],
                    });
                  }
                }}
                errorMesaage={stepsSignupData.dietTypeErr}
                mainFooterStyle={{ flex: 1.4, justifyContent: "flex-end" }}
                mainContainerStyle={{ flex: 4.6 }}
                isMultiSelection={true}
                btnText={translations[currentLanguage].next}
              />
            ),
          },
        ]
      : []),
    {
      // id: 6,
      // component: (
      //   <LanguageComponent
      //     bottomContentCustomStyle={{ marginTop: 25 }}
      //     handleSelectValue={(value, lang) => {
      //       // dispatch(setLanguage(lang));
      //       setStepsSignupData({
      //         ...stepsSignupData,
      //         languagePreference: value,
      //       });
      //     }}
      //     selectedValue={stepsSignupData.languagePreference}
      //     handleNext={() => {
      //       if (stepsSignupData.isSelectedDietaryRestriction) {
      //         setActiveSlide(6);
      //       } else {
      //         setActiveSlide(5);
      //       }
      //     }}
      //   />
      // ),
      id: 6,
      component: (
        <TermsAndCondition
          isLoading={isLoading}
          handleTermsAndCondition={async (value) => {
            setStepsSignupData({
              ...stepsSignupData,
              isTermAndCondition: value,
            });
            try {
              setIsLoading(true);
              const payload = {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.password,
                gender: stepsSignupData.gender,
                termsAndConditions: value,
                dietType: stepsSignupData.dietType,
                isDietaryRestrictions:
                  stepsSignupData.isSelectedDietaryRestriction,
                dietaryRestrictions: stepsSignupData.dietaryRestrictions,
                languagePreference: stepsSignupData.languagePreference,
              };
              delete payload.dietTypeErr;
              const url = getUrl("register");
              const res = await post(url, payload);
              const { success, message, data } = res;
              if (success) {
                setIsLoading(false);
                if (stepsSignupData.languagePreference === "Italian") {
                  dispatch(setLanguage("it"));
                  AsyncStorage.setItem("lang", "it");
                } else if (stepsSignupData.languagePreference === "Swedish") {
                  dispatch(setLanguage("sv"));
                  AsyncStorage.setItem("lang", "sv");
                } else if (stepsSignupData.languagePreference === "English") {
                  dispatch(setLanguage("en", "en"));
                }
                await AsyncStorage.setItem(
                  "userToken",
                  JSON.stringify(data.authToken)
                );
                await AsyncStorage.setItem(
                  "selectedMeal",
                  JSON.stringify(stepsSignupData.selectedMeals)
                );
                showToast("success", message);
                setTimeout(() => {
                  navigate("HomeTabs", {
                    screen: "Planner",
                    params: {
                      selectedItems: stepsSignupData.selectedMeals,
                    },
                  });
                }, 1000);
              } else {
                setIsLoading(false);
                showToast("error", message);
              }
            } catch (error) {
              setIsLoading(false);
              showToast("error", "Internal server error.");
            }
          }}
          mainContainerStyle={{
            marginTop: hp(21.56),
          }}
          mainContentStyle={{ flex: 4 }}
          mainFooterStyle={{ flex: 2 }}
        />
      ),
    },
    // {
    //   id: 7,
    //   component: (
    //     <TermsAndCondition
    //       isLoading={isLoading}
    //       handleTermsAndCondition={async (value) => {
    //         setStepsSignupData({
    //           ...stepsSignupData,
    //           isTermAndCondition: value,
    //         });
    //         try {
    //           setIsLoading(true);
    //           const payload = {
    //             username: userData.username,
    //             email: userData.email,
    //             password: userData.password,
    //             confirmPassword: userData.password,
    //             gender: stepsSignupData.gender,
    //             termsAndConditions: value,
    //             dietType: stepsSignupData.dietType,
    //             isDietaryRestrictions:
    //               stepsSignupData.isSelectedDietaryRestriction,
    //             dietaryRestrictions: stepsSignupData.dietaryRestrictions,
    //             languagePreference: stepsSignupData.languagePreference,
    //           };
    //           delete payload.dietTypeErr;
    //           const url = getUrl("register");
    //           const res = await post(url, payload);
    //           const { success, message, data } = res;
    //           if (success) {
    //             setIsLoading(false);
    //             if (stepsSignupData.languagePreference === "Italian") {
    //               dispatch(setLanguage("it"));
    //               AsyncStorage.setItem("lang", "it");
    //             } else if (stepsSignupData.languagePreference === "Swedish") {
    //               dispatch(setLanguage("sv"));
    //               AsyncStorage.setItem("lang", "sv");
    //             } else if (stepsSignupData.languagePreference === "English") {
    //               dispatch(setLanguage("en", "en"));
    //             }
    //             await AsyncStorage.setItem(
    //               "userToken",
    //               JSON.stringify(data.authToken)
    //             );
    //             await AsyncStorage.setItem(
    //               "selectedMeal",
    //               JSON.stringify(stepsSignupData.selectedMeals)
    //             );
    //             showToast("success", message);
    //             setTimeout(() => {
    //               navigate("HomeTabs", {
    //                 screen: "Planner",
    //                 params: {
    //                   selectedItems: stepsSignupData.selectedMeals,
    //                 },
    //               });
    //             }, 1000);
    //           } else {
    //             setIsLoading(false);
    //             showToast("error", message);
    //           }
    //         } catch (error) {
    //           setIsLoading(false);
    //           showToast("error", "Internal server error.");
    //         }
    //       }}
    //       mainContainerStyle={{
    //         marginTop: hp(21.56),
    //       }}
    //       mainContentStyle={{ flex: 4 }}
    //       mainFooterStyle={{ flex: 2 }}
    //     />
    //   ),
    // },
  ];

  return (
    <SafeAreaView style={styles.mainWelcomeContainer}>
      <ImageBackground
        source={images.signupBGImage} // Use the imported image here
        resizeMode="stretch"
        style={styles.welComeBgImg}
      >
        <View style={styles.container}>
          <View style={{ flex: 5.5, width: "100%" }}>
            {stepsData.map((step, index) => {
              return (
                <>
                  {activeSlide === index && (
                    <View
                      style={{ flex: 1 }}
                      key={`render-component${step.id}`}
                    >
                      {activeSlide === index ? step.component : null}
                    </View>
                  )}
                </>
              );
            })}
          </View>
          <View style={{ flex: 0.5 }}>
            <View
              style={{
                marginTop: hp(4.85),
                marginBottom: hp(4.38),
                display: "flex",
                flexDirection: "row",
                gap: 25,
              }}
            >
              {stepsData.map((_, index) => {
                return (
                  <View
                    key={`dot-${index}`}
                    style={{
                      ...styles.dot,
                      backgroundColor:
                        activeSlide === index ? COLORS.active : COLORS.white,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignupSteps;
