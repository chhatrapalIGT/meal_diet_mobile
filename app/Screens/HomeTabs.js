import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import COLORS from "../constants/colors";
import { images } from "../Resource/Images";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import SOSScreen from "./SOSScreen";
import MealsScreen from "./MealsScreen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { translations } from "../Language";

const HomeTabs = () => {
    const Tab = createBottomTabNavigator();
    const currentLanguage = useSelector((state) => state.language.language);
    return (
        <Tab.Navigator
            initialRouteName="Planner"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor:
                    route.name === "SOS" ? COLORS.error : COLORS.primaryNew, // Different tint color for Settings screen
                tabBarInactiveTintColor: COLORS.greyText,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingTop: hp(1.89),
                    paddingBottom: hp(1.65),
                    height: hp(9.47),
                },
                tabBarLabelStyle: {
                    fontSize: RFPercentage(1.3),
                    fontFamily: "Inter_500Medium",
                },
                tabBarIconStyle: {
                    marginBottom: hp(0.94),
                },
            })}
        >
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: translations[currentLanguage].settings.toLowerCase(),
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? images.activeSettingsIcon
                                    : images.settingsIcon
                            }
                            style={{ width: 32, height: 32 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="SOS"
                component={SOSScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: translations[currentLanguage].sos,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused ? images.activeSosIcon : images.sosIcon
                            }
                            style={{ width: 32, height: 32 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Planner"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: translations[currentLanguage].planner,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? images.activePlannerIcon
                                    : images.plannerIcon
                            }
                            style={{ width: 25, height: 29 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Meals"
                component={MealsScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: translations[currentLanguage].meals,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? images.activeMealsIcon
                                    : images.mealsIcon
                            }
                            style={{ width: 26, height: 33 }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeTabs;
