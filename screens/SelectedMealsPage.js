import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SelectedMealsPage = ({ route }) => {
    const navigation = useNavigation();
    const { selectedItems } = route.params;
    const foodgroupList = selectedItems;
    const navigateToHomePage = () => {
        navigation.navigate("HomePage", {
            selectedItems,
        });
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Selected Meals</Text>
            {foodgroupList.map((meal, index) => (
                <View
                    key={index}
                    style={[
                        styles.mealButton,
                        {
                            backgroundColor: selectedItems.includes(meal)
                                ? "blue"
                                : "transparent",
                        },
                    ]}
                >
                    <Text style={styles.mealButtonText}>{meal}</Text>
                </View>
            ))}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={navigateToHomePage}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    mealButton: {
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    mealButtonText: {
        fontSize: 18,
        color: "black",
    },
    nextButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
});

export default SelectedMealsPage;
