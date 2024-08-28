import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "../constants/colors";
import { images } from "../Resource/Images";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import SOSScreen from "./SOSScreen";
import MealsScreen from "./MealsScreen";

const HomeTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Planner"
            screenOptions={{
                tabBarActiveTintColor: COLORS.primaryNew,
                tabBarInactiveTintColor: COLORS.greyText,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingTop: 13,
                    height: 63,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: "Inter_500Medium",
                },
                tabBarIconStyle: {
                    marginBottom: 8,
                },
            }}
        >
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "settings",
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
                    tabBarLabel: "SOS",
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
                    tabBarLabel: "planner",
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
                    tabBarLabel: "meals",
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
