import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, StyleSheet } from "react-native";
import MoviesComponent from "./MoviesComponent";
import { useTheme } from "../context/ThemeContext";
import { width } from "../screens/HomeScreen";

//*********Detay sayfası için buradan devam edeceğiz önemli********
//burada filtreleme işlemleri yapılması gerekiyor
const DramaMovies = () => {
  const { colors, toggleTheme, isDarkTheme } = useTheme();

  return (
    <View style={[styles.tabScreen, { backgroundColor: colors.background }]}>
      <MoviesComponent />
    </View>
  );
};

const ActionMovies = () => {
  return (
    <View style={styles.tabScreen}>
      <Text>Aksiyon Filmler</Text>
    </View>
  );
};

const ComedyMovies = () => {
  return (
    <View style={styles.tabScreen}>
      <Text>Komedi Filmler</Text>
    </View>
  );
};

// Material Top Tab Navigator'ı oluşturuyoruz
const Tab = createMaterialTopTabNavigator();

const MoviesTabs = () => {
  const { colors, toggleTheme, isDarkTheme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="DramaMovies"
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textTabBar,
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.text,
          height: 2,
          width: width / 3,
          borderRadius: 10,
        },
        tabBarPressColor: colors.iconTabBar,
        tabBarPressOpacity: 0.1, // Daha hafif dokunma geri bildirimi
      }}
    >
      <Tab.Screen
        name="DramaMovies"
        component={DramaMovies}
        options={{ title: "Drama" }}
      />
      <Tab.Screen
        name="ActionMovies"
        component={ActionMovies}
        options={{ title: "Aksiyon" }}
      />
      <Tab.Screen
        name="ComedyMovies"
        component={ComedyMovies}
        options={{ title: "Komedi" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoviesTabs;
