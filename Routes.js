import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Localization from "expo-localization";

//Screens
import Welcome from "./app/Screens/Welcome";
import Signup from "./app/Screens/Signup/Signup";
import SignupSteps from "./app/Screens/Signup/SignupSteps";
import HomeTabs from "./app/Screens/HomeTabs";
import TermsAndConditionScreen from "./app/Screens/TermsAndCondition";
import ChangePasswordScreen from "./app/Screens/ChangePasswordScreen";
import MealListSceen from "./app/Screens/MealListSceen";
import SelectedMealListSceen from "./app/Screens/SelectedMealListSceen";
import TypesOfDietScreen from "./app/Screens/PersonalProfileScreens/TypesOfDiet";
import DietaryRestrictionsScreen from "./app/Screens/PersonalProfileScreens/DietaryRestrictions/DietaryRestrictions";
import DietaryRestrictionsOptionsScreen from "./app/Screens/PersonalProfileScreens/DietaryRestrictions/DietaryRestrictionsOptions";
import LanguageScreen from "./app/Screens/PersonalProfileScreens/Language";
// import { setLanguage } from "./app/store/Slices/languageSlice";
// import { useDispatch } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

// const getCountryLanguage = () => {
//   // Extract locale and country
//   const { locale, country } = Localization;
//   return {
//     language: locale.split("-")[0],
//     country: country || locale.split("-")[1],
//   };
// };
// const countryLanguageMap = {
//   US: "en",
//   IT: "it",
//   SE: "sv",
// };

// const getLocalLanguage = (countryCode) => {
//   return countryLanguageMap[countryCode] || "en"; // Default to English
// };
const Routes = () => {
  // const dispatch = useDispatch();
  // const handleSetLanguage = async () => {
  //   const localStoreLang = await AsyncStorage.getItem("lang");
  //   if (localStoreLang) {
  //     dispatch(setLanguage(localStoreLang));
  //   } else {
  //     const { country, language } = getCountryLanguage(); // Get the country code
  //     const localLanguage = getLocalLanguage(country);
  //     dispatch(setLanguage(localLanguage));
  //   }
  // };
  // useEffect(() => {
  //   handleSetLanguage();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Language">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignupSteps"
          component={SignupSteps}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MealListing"
          component={MealListSceen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectedMealListing"
          component={SelectedMealListSceen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassowrd"
          component={ChangePasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="typeOfDiet"
          component={TypesOfDietScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DietaryRestrictions"
          component={DietaryRestrictionsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DietaryRestrictionsOptions"
          component={DietaryRestrictionsOptionsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{
            headerShown: false,
          }}
          initialParams={{ firstTime: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
