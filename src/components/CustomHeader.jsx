import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import Entypo from "@expo/vector-icons/Entypo";

const CustomHeader = ({ navigation }) => {
  const { colors, isDarkTheme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {}, [toggleTheme, dispatch]);

  // Fontları yükle
  const [fonts] = useFonts({
    Nunito_700Bold,
  });

  // Fontlar yüklenmemişse, boş bir ekran göster
  if (!fonts) {
    return <Text>Fontlar Yükleniyor...</Text>;
  }

  return (
    <View
      style={[
        styles.header,
        isDarkTheme
          ? { backgroundColor: "#4a044e" }
          : { backgroundColor: "white" },
      ]}
    >
      <Text //***logo kısmı */
        style={[
          styles.title,
          isDarkTheme ? { color: colors.text } : { color: "#4a044e" },
        ]}
      >
        moonTv
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Feather
            name={isDarkTheme ? "sun" : "moon"}
            size={24}
            color={colors.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="settings" size={23} color={colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Entypo name="menu" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 10, // Sol Üst Köşe
    borderTopRightRadius: 40, // Sağ Üst Köşe
    borderBottomLeftRadius: 40, // Sol Alt Köşe
    borderBottomRightRadius: 10, // Sağ Alt Köşe
    marginHorizontal: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_700Bold", // Bold nunito fontunu kullandık
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.8,
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default CustomHeader;
