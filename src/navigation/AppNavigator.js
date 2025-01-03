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
import ComingSoonScreen from "../screens/ComingSoonScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  const { colors } = useTheme();
  //burayı düzenliyoruz geributonu nasıl olacak ona bakıyoruz devam ediyoruz
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
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
        // headerTintColor: colors.text, // Header metni rengi opsiyonel
      })}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        // options={{ title: "Detay" }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomFeatherIcon {...props} />} // Feather tabBar
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: "Ana Sayfa" }}
      />
      <Tab.Screen
        name="Movies"
        component={MovieScreen}
        options={{ tabBarLabel: "Filmler" }}
      />
      <Tab.Screen
        name="ComingSoon"
        component={ComingSoonScreen}
        options={{ tabBarLabel: "Yakında" }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ tabBarLabel: "Giriş Yap" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
