import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const RegisterScreen = ({ navigation }) => {
  const { colors, isDarkTheme } = useTheme();

  const handleRegister = ({ navigation }) => {
    // Kayıt işlemleri burada yapılacak
    Alert.alert("Kayıt Olundu", "Kayıt başarılı!");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Kayıt Ol</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Ad"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Soyad"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="E-posta"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Şifre"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
        secureTextEntry
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Şifre Onayla"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDarkTheme ? "#4a044e" : "#4a044e" },
        ]}
        onPress={handleRegister}
      >
        <Text
          style={[
            styles.buttonText,
            isDarkTheme ? { color: colors.text } : { color: "white" },
          ]}
        >
          Kaydol
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 20,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 6,
  },
  buttonRegister: {
    fontWeight: "bold",
  },
});
