import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from './CustomHeader';


const Feedback = () => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (starNumber) => {
    setRating(starNumber);
  };

  const handleRateButtonPress = () => {
    // Handle the rating submission here
    console.log('Rated:', rating);
    // You can add further logic here, like sending the rating to a server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How was your experience with Mind Diet?</Text>

      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Icon
              name={star <= rating ? 'star' : 'star-outline'}
              type='ionicon'
              color={star <= rating ? 'orange' : 'black'}
              size={35} 
            
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.rateButton} onPress={handleRateButtonPress}>
        <Text style={styles.rateButtonText}>Rate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  rateButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Feedback;
