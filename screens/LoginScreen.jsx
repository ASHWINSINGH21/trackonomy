import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('Dashboard'); 
    } else {
      alert('Please enter username and password!');
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkBackground]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      
      <Text style={[styles.title, darkMode && styles.darkText]}>Welcome Back!</Text>
      <Text style={[styles.subtitle, darkMode && styles.darkText]}>Log in to your account</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Username"
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Password"
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setDarkMode(!darkMode)} style={styles.darkModeToggle}>
        <Text style={[styles.darkModeText, darkMode && styles.darkText]}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#555',
  },
  inputBox: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#00b894',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  darkModeToggle: {
    marginTop: 20,
  },
  darkModeText: {
    fontSize: 16,
    color: '#555',
  },
  darkText: {
    color: '#fff',
  },
});
