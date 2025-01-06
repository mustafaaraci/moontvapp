import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

const AppContent = () => {
  const { colors, isDarkTheme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.headerBackground}
      />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
      >
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
