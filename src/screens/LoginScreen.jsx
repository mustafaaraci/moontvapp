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

const LoginScreen = ({ navigation }) => {
  const { colors, isDarkTheme } = useTheme();

  const handleLogin = () => {
    // Giriş işlemleri burada yapılacak
    Alert.alert("Giriş işlemleri yapılacak!");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Giriş Yap</Text>

      <TextInput
        style={[
          styles.input,
          styles.inputEmail,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="E-posta"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
      />
      <TextInput
        style={[
          styles.input,
          styles.inputPassword,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Şifre"
        placeholderTextColor={colors.text}
        selectionColor={isDarkTheme ? colors.text : "#4a044e"}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDarkTheme ? "#4a044e" : "#4a044e" },
        ]}
        onPress={handleLogin}
      >
        <Text
          style={[
            styles.buttonText,
            isDarkTheme ? { color: colors.text } : { color: "white" },
          ]}
        >
          Giriş Yap
        </Text>
      </TouchableOpacity>

      <Pressable
      //yapılacak
      //onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.registerText, { color: colors.text }]}>
          Henüz bir hesabınız yok mu?
          <Text style={styles.buttonRegister}>Kaydol</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

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
  },
  inputEmail: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputPassword: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
