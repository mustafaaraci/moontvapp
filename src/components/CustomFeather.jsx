import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";

const CustomFeatherIcon = ({ state, descriptors, navigation }) => {
  const { colors, isDarkTheme } = useTheme();
  const [isFocused, setIsFocused] = useState(true);

  //  her bir sekme için animasyon değerlerini saklamak için useRef kullanıyoruz
  const scales = useRef(state.routes.map(() => new Animated.Value(1))).current;

  // İlk yüklendiğinde animasyonu başlatmak için useEffect kullanıyoruz
  useEffect(() => {
    Animated.spring(scales[state.index], {
      toValue: 1.2,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [state.index, fonts]);

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
        styles.tabBar,
        isDarkTheme
          ? {
              borderTopWidth: 0.8,
              borderTopColor: colors.border,
              backgroundColor: colors.background,
            }
          : {
              backgroundColor: colors.background,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tabBarLabel =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        // hangi sekmenin seçili olduğunu kontrol etmek için kullanıyoruz
        const isFocused = state.index === index;

        //event tetiklemek için
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // önceki seçili olanı normale döndürme
            Animated.spring(scales[state.index], {
              toValue: 1,
              friction: 3,
              useNativeDriver: true,
            }).start();

            // yeni seçili olanı büyütme
            Animated.spring(scales[index], {
              toValue: 1.2, // büyütme oranı
              friction: 3,
              useNativeDriver: true,
            }).start();

            navigation.navigate(route.name);
          }
        };

        let iconName;
        let IconComponent;
        if (route.name === "Home") {
          iconName = "home";
          IconComponent = Entypo;
        } else if (route.name === "Movies") {
          iconName = "filmstrip-box";
          IconComponent = MaterialCommunityIcons;
        } else if (route.name === "Favorites") {
          iconName = "heart";
          IconComponent = Entypo;
        } else if (route.name === "Login") {
          iconName = "user";
          IconComponent = FontAwesome;
        }

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Animated.View style={styles.iconContainer}>
              <Animated.View style={{ transform: [{ scale: scales[index] }] }}>
                <IconComponent
                  name={iconName}
                  size={24}
                  color={
                    isFocused ? colors.selectedIconTabBar : colors.iconTabBar
                  }
                  style={isFocused ? styles.selectedIconTabBar : styles.icon}
                />
              </Animated.View>
              <Text
                style={{
                  color: isFocused
                    ? colors.selectedTextTabBar
                    : colors.textTabBar,
                  fontSize: isFocused ? 10 : 10, // seçili olanın yazı boyutu opsiyonel
                  fontFamily: "Nunito_700Bold", // Bold nunito fontunu kullandık
                }}
              >
                {tabBarLabel}
              </Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomFeatherIcon;
