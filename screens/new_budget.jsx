import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TrackonomyScreen() {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [investment, setInvestment] = useState('');

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const remaining = budget ? parseFloat(budget) - totalSpent : 0;
  const theme = darkMode ? darkStyles : lightStyles;

  useEffect(() => {
    StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
  }, [darkMode]);

  const addTransaction = () => {
    if (!description || !amount) return;
    const newTransaction = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
    };
    setTransactions([newTransaction, ...transactions]);
    setDescription('');
    setAmount('');
  };

  const confirmReset = () => {
    Alert.alert('Confirm Reset', 'Are you sure you want to reset all data?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetAll },
    ]);
  };

  const resetAll = () => {
    setBudget('');
    setSavingsGoal('');
    setInvestment('');
    setTransactions([]);
  };

  const renderTransaction = ({ item }) => (
    <View style={theme.transactionItem}>
      <Text style={theme.transactionText}>
        {item.description}: ₹{item.amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={theme.safeArea}>
      <View style={theme.innerSafeArea}>
        {/* Navbar */}
        <View style={[theme.navbar, darkMode && theme.darkNavbar]}>
          <Text style={[theme.logo, darkMode && theme.darkText]}>
            💰 Trackonomy
          </Text>

          <View style={theme.navLinksRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={[theme.navLink, darkMode && theme.darkText]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Text style={[theme.navLink, darkMode && theme.darkText]}>
                Dashboard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={[theme.navLink, darkMode && theme.darkText]}>
                Transactions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Text style={[theme.navLink, darkMode && theme.darkText]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dark Mode Toggle */}
          <TouchableOpacity
            style={theme.toggleButton}
            onPress={() => setDarkMode(!darkMode)}>
            <Text style={[theme.toggleIcon, darkMode && theme.darkText]}>
              {darkMode ? '🌞' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Page Content inside FlatList */}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          contentContainerStyle={theme.container}
          ListHeaderComponent={
            <View>
              {/* Inputs Section */}
              <View style={theme.section}>
                <Text style={theme.label}>Monthly Budget</Text>
                <TextInput
                  style={theme.input}
                  placeholder="Enter your budget"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="numeric"
                  value={budget}
                  onChangeText={setBudget}
                />
              </View>

              <View style={theme.section}>
                <Text style={theme.label}>Savings Goal</Text>
                <TextInput
                  style={theme.input}
                  placeholder="Enter your savings goal"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="numeric"
                  value={savingsGoal}
                  onChangeText={setSavingsGoal}
                />
              </View>

              <View style={theme.section}>
                <Text style={theme.label}>Investment</Text>
                <TextInput
                  style={theme.input}
                  placeholder="Enter investment amount"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="numeric"
                  value={investment}
                  onChangeText={setInvestment}
                />
              </View>

              <View style={theme.section}>
                <Text style={theme.label}>Add Transaction</Text>
                <TextInput
                  style={theme.input}
                  placeholder="Description"
                  placeholderTextColor={theme.placeholder}
                  value={description}
                  onChangeText={setDescription}
                />
                <TextInput
                  style={theme.input}
                  placeholder="Amount"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
                <TouchableOpacity style={theme.button} onPress={addTransaction}>
                  <Text style={theme.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>

              {/* Summary */}
              <View style={theme.summary}>
                <Text style={theme.summaryText}>💰 Budget: ₹{budget || 0}</Text>
                <Text style={theme.summaryText}>🧾 Spent: ₹{totalSpent}</Text>
                <Text style={theme.summaryText}>
                  📈 Investment: ₹{investment || 0}
                </Text>
                <Text style={theme.summaryText}>
                  💡 Savings Goal: ₹{savingsGoal || 0}
                </Text>
                <Text style={theme.summaryText}>
                  ✅ Remaining: ₹{remaining.toFixed(2)}
                </Text>
              </View>

              {/* Reset Button */}
              <View style={theme.section}>
                <TouchableOpacity style={theme.button} onPress={confirmReset}>
                  <Text style={theme.buttonText}>Reset All</Text>
                </TouchableOpacity>
              </View>

              {/* Transaction History Label */}
              <View style={theme.section}>
                <Text style={theme.label}>Transaction History</Text>
                {transactions.length === 0 && (
                  <Text style={theme.placeholderText}>No transactions yet.</Text>
                )}
              </View>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

/* STYLES */
const baseStyles = {
  section: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  summary: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  transactionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'ios' ? 0 : 20 },
  innerSafeArea: { flex: 1 },
  container: { paddingHorizontal: 16, backgroundColor: '#fff', paddingBottom: 30 },
  navbar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  darkNavbar: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  navLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  navLink: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: '#555',
  },
  darkText: {
    color: '#ffffff',
  },
  activeLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  toggleButton: {
    position: 'absolute',
    top: 10,
    right: 16,
  },
  toggleIcon: {
    fontSize: 24,
    color: '#000',
  },
  label: { color: '#000', fontSize: 16, marginBottom: 8 },
  input: {
    ...baseStyles.input,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  button: { ...baseStyles.button, backgroundColor: '#007bff' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  summary: { ...baseStyles.summary, backgroundColor: '#f7f7f7' },
  summaryText: { fontSize: 16, color: '#000' },
  transactionItem: {
    ...baseStyles.transactionItem,
    borderBottomColor: '#ccc',
  },
  transactionText: { color: '#333' },
  placeholder: '#888',
  placeholderText: { color: '#888', fontStyle: 'italic' },
});

const darkStyles = StyleSheet.create({
  ...lightStyles,
  safeArea: { flex: 1, backgroundColor: '#121212', paddingTop: Platform.OS === 'ios' ? 0 : 20 },
  container: { paddingHorizontal: 16, backgroundColor: '#121212', paddingBottom: 30 },
  logo: { color: '#fff' },
  navLink: { color: '#bbb' },
  activeLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#fff',
  },
  toggleButton: {
    position: 'absolute',
    top: 10,
    right: 16,
  },
  toggleIcon: { color: '#fff' },
  label: { color: '#fff' },
  input: {
    ...baseStyles.input,
    borderColor: '#444',
    backgroundColor: '#1E1E1E',
    color: '#fff',
  },
  button: { ...baseStyles.button, backgroundColor: '#03DAC6' },
  buttonText: { color: '#000' },
  summary: { backgroundColor: '#1E1E1E' },
  summaryText: { color: '#fff' },
  transactionText: { color: '#ccc' },
  placeholder: '#aaa',
  placeholderText: { color: '#aaa', fontStyle: 'italic' },
});
