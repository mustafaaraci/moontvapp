import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import { useTheme } from "../context/ThemeContext";
import CustomFeatherIcon from "../components/CustomFeather";
import FavoritesScreen from "../screens/FavoritesScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { colors, isDarkTheme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        // headerShown: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.2} // Dokunulduğunda opasite
            style={{
              marginLeft: 15,
              padding: 5,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: colors.icon, // Tema rengine göre border rengi
            }}
          >
            <Feather name="arrow-left" size={24} color={colors.icon} />
          </TouchableOpacity>
        ),
        headerTitle: "", // Header başlığını kaldırıyoruz
        headerStyle: {
          backgroundColor: colors.headerBackground, // Tema rengine göre header arka planı
        },
        //headerTintColor: colors.text, // Header metni rengi opsiyonel
      })}
    >
      <Stack.Screen
        name="StackHome"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomFeatherIcon {...props} />} // Feather tabBar
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Ana Sayfa", headerShown: false }}
      />
      <Tab.Screen
        name="Movies"
        component={MovieScreen}
        options={{ tabBarLabel: "Filmler", headerShown: false }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: "Favoriler", headerShown: false }}
      />

      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ tabBarLabel: "Giriş Yap", headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
