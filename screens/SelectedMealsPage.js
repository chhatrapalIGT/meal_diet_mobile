import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";

const showToast = (type, text1, text2) => {
  Toast.show({
    type: type, 
    text1: text1,
    text2: text2,
    position: 'top',
  });
};

const SelectedMealsPage = ({ route }) => {
  const navigation = useNavigation();
  const { selectedItems } = route.params;
  const [foodgroupList, setFoodgroupList] = useState([]);
  // Function to navigate to the home page
  const navigateToHomePage = () => {
    navigation.navigate("HomePage", {
      selectedItems,
    });
  };
  const getFoodGroupData = async () => {
    try {
      const response = await axios.post(
        "http://209.97.132.213:3000/auth/findAllGroupArray"
      );
      if (response.data.success) {
        setFoodgroupList(response.data.data);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  useEffect(() => {
    getFoodGroupData();
  }, []);
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
      <TouchableOpacity style={styles.nextButton} onPress={navigateToHomePage}>
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
