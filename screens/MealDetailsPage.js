import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealDetailsPage = ({ route }) => {
  const { meal, selectedItems } = route.params;
  const [mealList, setMealList] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealKey, setMealKey] = useState(meal.Meal);

  const [isAlternativeVisible, setAlternativeVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [scrollX] = useState(new Animated.Value(0)); // Track scroll position

  const openAlternative = () => setAlternativeVisible(true);
  const closeAlternative = () => setAlternativeVisible(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigateToPage = (page) => {
    navigation.navigate(page);
    closeMenu(); // Close the menu after navigation
  };
  const handleDateNavigation = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === "yesterday") {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (direction === "tomorrow") {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaywiseFoodgroup = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[currentDate.getDay()];
    const payload = {
      username: userData.user.username,
      mealType: [mealKey],
      day: day,
    };
    try {
      const response = await axios.post(
        "http://209.97.132.213:3000/auth/findDayWise",
        payload
      );
      if (response.data.success) {
        setMealList(response.data.data);
        setSelectedMeal(response.data.data[0]);
      } else {
        showToast("error", response.data.error);
        setMealList([]);
        setSelectedMeal(null);
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setMealList([]);
      setSelectedMeal(null);
    }
  };
  useEffect(() => {
    getDaywiseFoodgroup();
  }, [currentDate, mealKey]);

  const renderMealOptions = () => {
    return selectedItems.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // navigation.navigate(option);
          setMealKey(option);
        }}
        style={styles.mealOption}
      >
        <Text style={styles.mealOptionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => handleDateNavigation("yesterday")}>
          <Text style={styles.navigationText}>Yesterday</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{currentDate.toDateString()}</Text>
        <TouchableOpacity onPress={() => handleDateNavigation("tomorrow")}>
          <Text style={styles.navigationText}>Tomorrow</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.mealOptionsContainer}>{renderMealOptions()}</View>
      </ScrollView>
      {selectedMeal ? (
        <>
          <Text style={styles.title}>{selectedMeal.Meal}</Text>
          <ScrollView>
            <Image
              source={require("../assets/breakfastdesign.jpg")}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Yoghurt bowl with fruits</Text>
              <View style={styles.ingredientsContainer}>
                {selectedMeal.Items.map((ingredient, index) => (
                  <Text key={index}>{`${index + 1}. ${ingredient.name}`}</Text>
                ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={openAlternative}
              style={styles.swipeButton}
            >
              <Text style={styles.swipeButtonText}>
                Click to see other options
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
        <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}> 
          <Text>No Data found of this meal</Text>
        </View>
      )}

      <View style={styles.bottomIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="settings" size={30} color="black" onPress={openMenu} />
          <Text style={styles.iconLabel}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="description" size={30} color="black" />
          <Text style={styles.iconLabel}>Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="apple" type="font-awesome-5" size={30} color="black" />
          <Text style={styles.iconLabel}>Meal</Text>
        </TouchableOpacity>
      </View>

      <Overlay isVisible={isMenuVisible} onBackdropPress={closeMenu}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToPage("Signup")}
          >
            <Text>Account Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToPage("MealSelectionPage")}
          >
            <Text>Meal Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToPage("TermsAndConditions")}
          >
            <Text>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <Overlay
        isVisible={isAlternativeVisible}
        onBackdropPress={closeAlternative}
      >
        <Text>Alternative Option 1</Text>
        <Text>Alternative Option 2</Text>
        <Text>Alternative Option 3</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FFFF", // Light blue background color
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navigationText: {
    fontSize: 16,
    color: "blue",
  },
  mealOptionsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mealOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#E0FFFF",
    marginRight: 10,
  },
  mealOptionText: {
    fontSize: 16,
    color: "black",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    alignSelf: "center", // Align title to center
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  ingredientsContainer: {
    padding: 10,
  },
  swipeButton: {
    alignItems: "center",
    marginVertical: 20,
  },
  swipeButtonText: {
    fontSize: 18,
    color: "blue",
  },
  bottomIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MealDetailsPage;
