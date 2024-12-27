import React from "react";
import * as Sentry from '@sentry/react-native';
import { View, StatusBar, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { PaytoneOne_400Regular } from "@expo-google-fonts/paytone-one";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Provider } from "react-redux";
import store from "./app/store";
import Routes from "./Routes";

Sentry.init({
  dsn: "https://973df241877ce7414eb140408eb39dba@o4506988063621120.ingest.us.sentry.io/4507383862132736",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

const App = () => {
  const [fontsLoaded] = useFonts({
    PaytoneOne_400Regular,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={"#FF9900"} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
          <Routes/>
        <Toast />
      </Provider>
    </View>
  );
};

export default App;
