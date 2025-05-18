import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>⚙️ Settings</Text>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>👤 Profile Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🔔 Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🎨 App Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🔒 Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🌍 Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🔗 Account Linking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🔐 Privacy Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>💬 Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>📋 Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>📱 Backup & Restore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>📅 App Version</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🌙 Dark Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={() => navigation.replace('Login')}>
          <Text style={[styles.optionText, styles.logoutText]}>🚪 Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b894',
    marginBottom: 30,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#2d2d2d',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 18,
    color: '#ffffff',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
