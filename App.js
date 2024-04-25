import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signup,
  Welcome,
  HomePage,
  BreakfastPage,
  TermsAndConditions,
  MorningSnackPage,
  LunchPage,
  AfternoonSnackPage,
  EveningSnackPage,
  DinnerPage,
  Feedback,
  MealSelectionPage,
  SelectedMealsPage,
} from "./screens";
import Toast from "react-native-toast-message";
import { View, StatusBar } from "react-native";
import MealDetailsPage from "./screens/MealDetailsPage";

const Stack = createNativeStackNavigator();

const App = () => {
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
            name="Login"
            component={Login}
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
            name="HomePage"
            component={HomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealDetailsPage"
            component={MealDetailsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BreakfastPage"
            component={BreakfastPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="MorningSnackPage"
            component={MorningSnackPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="LunchPage"
            component={LunchPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AfternoonSnackPage"
            component={AfternoonSnackPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EveningSnackPage"
            component={EveningSnackPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="DinnerPage"
            component={DinnerPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="MealSelectionPage"
            component={MealSelectionPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SelectedMealsPage"
            component={SelectedMealsPage}
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
