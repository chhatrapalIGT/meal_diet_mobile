import React, { useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

import COLORS from "../constants/colors";
import Button from "../components/Button";

const Welcome = () => {
    const { height } = Dimensions.get("window");
    const { navigate } = useNavigation();

    const handleRedirect = async() =>{
        const authToken = JSON.parse(await AsyncStorage.getItem("userToken"));
        if(authToken){
            navigate('MealSelectionPage')
        }
    }
    useEffect(() => {
        handleRedirect()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={[COLORS.secondary, COLORS.primary]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ minHeight: height }}>
                        <View>
                            <Image
                                source={require("../assets/nuts.jpg")}
                                resizeMode="cover"
                                style={{
                                    height: hp(12.75),
                                    width: hp(12.75),
                                    borderRadius: 20,
                                    position: "absolute",
                                    top: hp(1.25),
                                    transform: [
                                        { translateX: wp(5.2) },
                                        { translateY: hp(6.4) },
                                        { rotate: "-15deg" },
                                    ],
                                }}
                            />

                            <Image
                                source={require("../assets/breakfastdesign.jpg")}
                                resizeMode="cover"
                                style={{
                                    height: hp(12.75),
                                    width: hp(12.75),
                                    borderRadius: 20,
                                    position: "absolute",
                                    top: -hp(3.8),
                                    left: wp(26),
                                    transform: [
                                        { translateX: wp(13.05) },
                                        { translateY: hp(6.4) },
                                        { rotate: "-5deg" },
                                    ],
                                }}
                            />

                            <Image
                                source={require("../assets/morningsnack.jpg")}
                                resizeMode="cover"
                                style={{
                                    width: hp(12.75),
                                    height: hp(12.75),
                                    borderRadius: 20,
                                    position: "absolute",
                                    top: hp(16.6),
                                    left: -wp(13),
                                    transform: [
                                        { translateX: wp(13.05) },
                                        { translateY: hp(6.4) },
                                        { rotate: "15deg" },
                                    ],
                                }}
                            />

                            <Image
                                source={require("../assets/dinner.jpg")}
                                resizeMode="cover"
                                style={{
                                    height: hp(25.5),
                                    width: hp(25.5),
                                    borderRadius: 20,
                                    position: "absolute",
                                    top: hp(14),
                                    left: wp(26),
                                    transform: [
                                        { translateX: wp(13.05) },
                                        { translateY: hp(6.4) },
                                        { rotate: "-15deg" },
                                    ],
                                }}
                            />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: wp(5.7),
                                position: "absolute",
                                top: hp(51),
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: RFPercentage(5.3),
                                    fontWeight: 800,
                                    color: COLORS.white,
                                }}
                            >
                                Mind Diet
                            </Text>
                            <Text
                                style={{
                                    fontSize: RFPercentage(4),
                                    fontWeight: 800,
                                    color: COLORS.white,
                                }}
                            >
                                Let's start
                            </Text>

                            <View style={{ marginVertical: hp(2.8) }}>
                                <Text
                                    style={{
                                        fontSize: RFPercentage(2.6),
                                        color: COLORS.white,
                                        marginVertical: hp(0.5),
                                    }}
                                >
                                    Eat to Nourish Your Body and Mind
                                </Text>
                                <Text
                                    style={{
                                        fontSize: RFPercentage(2.6),
                                        color: COLORS.white,
                                    }}
                                >
                                    Nothing Tastes As Good As Healthy Food
                                </Text>
                            </View>

                            <Button
                                title="Join Now"
                                onPress={() => navigate("Signup")}
                                style={{
                                    marginTop: hp(2.8),
                                    width: "100%",
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: hp(1.55),
                                    justifyContent: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: RFPercentage(2.1),
                                        color: COLORS.white,
                                    }}
                                >
                                    Already have an account ?
                                </Text>
                                <Pressable onPress={() => navigate("Login")}>
                                    <Text
                                        style={{
                                            fontSize: RFPercentage(2.1),
                                            color: COLORS.white,
                                            fontWeight: "bold",
                                            marginLeft: wp(1),
                                        }}
                                    >
                                        Login
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Welcome;
