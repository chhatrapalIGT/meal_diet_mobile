// TermsAndConditions.js

import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';


const TermsAndConditions = () => {
  const navigation = useNavigation();
  const handleAgree = () => {

    // Handle the logic when the user agrees

    // For example, navigate to the sign-up page

    navigation.navigate('SignUp');

  };


  return (

    <ScrollView style={{ padding: 20 }}>

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>

        1. Disclaimer:

      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>

        The information provided within this mobile application is
intended for educational and informational purposes only. It is not a
substitute for professional medical advice, diagnosis, or treatment.
Users should consult with a qualified healthcare professional before
making any dietary or lifestyle changes based on the information
provided in this app.

      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>

        2. Individual Results:

      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>

        Results may vary for each individual based on factors such as
adherence to the provided guidelines, metabolic rate, genetics, and
overall health condition. The effectiveness of any diet plan or
exercise regimen may differ from person to person.

      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>

        3. Nutritional Information:

      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>

        Nutritional information provided in this app is approximate
and should not be considered as medical advice. Users with specific
dietary needs should verify the accuracy of nutritional information
for their individual requirements.

      </Text>

      {/* Add more terms and conditions points as needed */}

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>

      4. Allergies and Sensitivities:

      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>

      Add a notification or warning within recipe details for common
allergens, advising users to check ingredients carefully.

      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>

      5. User Responsibility:
      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>
      Include a disclaimer in the app's terms of use or settings
section, reminding users of their responsibility for their health
decisions.
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>
      6. Use of Information:
      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>

      Display a pop-up message upon first use of the app, informing
users that they use the information at their own risk.
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, color: COLORS.black }}>
      7. Copyright:
      </Text>

      <Text style={{ marginBottom: 10, color: COLORS.black }}>
      Add copyright information in the app's footer or settings
section, stating that all content belongs to your company and
reproduction without permission is prohibited.
      </Text>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={handleAgree} style={{
backgroundColor: COLORS.primary, padding: 10, borderRadius: 8, width:
120, alignItems: 'center' }}>
          <Text style={{ color: COLORS.white }}>Agree</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{
marginTop: 10 }}>
          <Text style={{ color: COLORS.primary }}>Disagree</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );

};


export default TermsAndConditions;
