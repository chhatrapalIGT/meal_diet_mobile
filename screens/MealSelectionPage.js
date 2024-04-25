import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";

const showToast = (type, text1, text2) => {
  Toast.show({
    type: type, 
    text1: text1,
    text2: text2,
    position: 'top',
  });
};
const MealSelectionPage = () => {
  const navigation = useNavigation();
  const [foodgroupList, setFoodgroupList] = useState([]);

  // Initialize state to keep track of selected items for each meal
  const [selectedFoodGroupList, setSelectedFoodGroupList] = useState([]);

  // Function to navigate to the next page with accumulated selected items
  const navigateToSelectedMealsPage = () => {
    navigation.navigate("SelectedMealsPage", {
      selectedItems: selectedFoodGroupList,
    });
  };

  // Function to update selected items for a specific meal
  const handleMealButtonPress = (meal) => {
    if (selectedFoodGroupList.includes(meal)) {
      const filterData = selectedFoodGroupList.filter((item) => item !== meal);
      setSelectedFoodGroupList(filterData);
    } else {
      setSelectedFoodGroupList([...selectedFoodGroupList, meal]);
    }
  };

  const getFoodGroupData = async () => {
    try {
      const response = await axios.post(
        "http://209.97.132.213:3000/auth/findAllGroupArray"
      );
      if(response.data.success){
        setFoodgroupList(response.data.data)
      }else{
        showToast('error', response.data.message);
      }

    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  useEffect(() => {
    getFoodGroupData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Which meals do you usually have?</Text>
      <Text style={styles.subtitle}>Select the meals you have</Text>

      {foodgroupList.map((meal, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.mealButton,
            {
              backgroundColor: selectedFoodGroupList.includes(meal)
                ? "blue"
                : "transparent",
            },
          ]}
          onPress={() => handleMealButtonPress(meal)}
        >
          <Text style={styles.mealButtonText}>{meal}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={navigateToSelectedMealsPage}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
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

export default MealSelectionPage;
