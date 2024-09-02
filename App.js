import React from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { PaytoneOne_400Regular } from "@expo-google-fonts/paytone-one";
import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Screens
import Welcome from "./app/Screens/Welcome";
import Signup from "./app/Screens/Signup/Signup";
import SignupSteps from "./app/Screens/Signup/SignupSteps";
import HomeTabs from "./app/Screens/HomeTabs";
import TermsAndConditionScreen from "./app/Screens/TermsAndCondition";
import ChangePasswordScreen from "./app/Screens/ChangePasswordScreen";
import MealListSceen from "./app/Screens/MealListSceen";
import SelectedMealListSceen from "./app/Screens/SelectedMealListSceen";

Sentry.init({
  dsn: "https://973df241877ce7414eb140408eb39dba@o4506988063621120.ingest.us.sentry.io/4507383862132736",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

const Stack = createNativeStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({
        PaytoneOne_400Regular,
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={"#FF9900"} />
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />

            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
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
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </View>
    );
};

export default App;
