import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkStyles : lightStyles;

  const userName = 'Ashwin'; 
  const balance = 12500000; 
  const income = 8000;
  const expenses = 3000;
  const savingsGoal = 10000;
  const savingsAchieved = 4000;
  const investments = 15000;

  const transactions = [
    { id: '1', description: 'Groceries', amount: -500 },
    { id: '2', description: 'Salary', amount: 5000 },
    { id: '3', description: 'Netflix', amount: -15 },
    { id: '4', description: 'Stocks Profit', amount: 1000 },
  ];

  const budgetUsed = ((expenses / income) * 100).toFixed(0);
  const savingsProgress = ((savingsAchieved / savingsGoal) * 100).toFixed(0);

  useEffect(() => {
    StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(darkMode ? '#121212' : '#ffffff'); // Add this to change background color as well
  }, [darkMode]);

  return (
    <View style={theme.safeArea}>
      <SafeAreaView style={theme.innerSafeArea}>

        <View style={theme.navbar}>
          <Text style={theme.logo}>💰 Trackonomy</Text>

          <TouchableOpacity
            style={theme.toggleButton}
            onPress={() => setDarkMode(!darkMode)}>
            <Text style={theme.toggleIcon}>
              {darkMode ? '🌞' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={theme.container}>
          {/* Greeting */}
          <Text style={theme.greeting}>Hello, {userName} 👋</Text>

          {/* Balance */}
          <View style={theme.balanceCard}>
            <Text style={theme.balanceTitle}>Current Balance</Text>
            <Text style={theme.balanceAmount}>₹{balance.toLocaleString()}</Text>
          </View>

          {/* Income vs Expenses */}
          <View style={theme.row}>
            <View style={theme.incomeCard}>
              <Text style={theme.smallTitle}>Income</Text>
              <Text style={theme.incomeAmount}>₹{income.toLocaleString()}</Text>
            </View>

            <View style={theme.expenseCard}>
              <Text style={theme.smallTitle}>Expenses</Text>
              <Text style={theme.expenseAmount}>₹{expenses.toLocaleString()}</Text>
            </View>
          </View>

          {/* Budget Health */}
          <View style={theme.progressCard}>
            <Text style={theme.smallTitle}>Budget Used</Text>
            <View style={theme.progressBar}>
              <View style={[theme.progressFill, { width: `${budgetUsed}%` }]} />
            </View>
            <Text style={theme.progressText}>{budgetUsed}% of income spent</Text>
          </View>

          {/* Savings Goal */}
          <View style={theme.progressCard}>
            <Text style={theme.smallTitle}>Savings Goal</Text>
            <View style={theme.progressBar}>
              <View style={[theme.savingsFill, { width: `${savingsProgress}%` }]} />
            </View>
            <Text style={theme.progressText}>{savingsProgress}% saved</Text>
          </View>

          {/* Investments */}
          <View style={theme.investmentCard}>
            <Text style={theme.smallTitle}>Investments</Text>
            <Text style={theme.investmentAmount}>₹{investments.toLocaleString()}</Text>
          </View>

          {/* Recent Transactions */}
          <View style={theme.section}>
            <Text style={theme.sectionTitle}>Recent Transactions</Text>
            {transactions.length === 0 ? (
              <Text style={theme.placeholderText}>No transactions yet.</Text>
            ) : (
              <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={theme.transactionItem}>
                    <Text style={theme.transactionText}>
                      {item.description}
                    </Text>
                    <Text style={[ 
                      theme.transactionAmount,
                      { color: item.amount < 0 ? 'red' : 'green' }
                    ]}>
                      {item.amount < 0 ? `- ₹${Math.abs(item.amount)}` : `+ ₹${item.amount}`}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>

          {/* Quick Actions */}
          <View style={theme.quickActions}>
            <TouchableOpacity style={theme.quickButton}>
              <Text style={theme.quickButtonText}>➕ Add Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.quickButton}>
              <Text style={theme.quickButtonText}>📊 View Reports</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* Styles for Light and Dark modes */
const baseStyles = {
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  safeArea: { flex: 1, backgroundColor: '#fff' },
  innerSafeArea: { flex: 1 },
  container: { padding: 16 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  logo: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  toggleButton: { padding: 8 },
  toggleIcon: { fontSize: 24, color: '#555' },
  greeting: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  balanceCard: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceTitle: { fontSize: 18, color: '#fff' },
  balanceAmount: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  incomeCard: { backgroundColor: '#d1e7dd', borderRadius: 12, padding: 20, flex: 0.48 },
  expenseCard: { backgroundColor: '#f8d7da', borderRadius: 12, padding: 20, flex: 0.48 },
  smallTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  incomeAmount: { fontSize: 20, color: '#0f5132' },
  expenseAmount: { fontSize: 20, color: '#842029' },
  progressCard: { marginBottom: 20 },
  progressBar: { height: 10, backgroundColor: '#eee', borderRadius: 5, overflow: 'hidden', marginVertical: 8 },
  progressFill: { height: '100%', backgroundColor: '#007bff' },
  savingsFill: { height: '100%', backgroundColor: '#28a745' },
  progressText: { fontSize: 14, color: '#555' },
  investmentCard: {
    backgroundColor: '#e2e3e5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  investmentAmount: { fontSize: 24, fontWeight: 'bold', marginTop: 8, color: '#333' },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: { fontSize: 16, color: '#333' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  quickButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  quickButtonText: { color: '#fff', fontWeight: 'bold' },
  placeholderText: { fontStyle: 'italic', color: '#aaa' },
});

const darkStyles = StyleSheet.create({
  ...lightStyles,
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { padding: 16, backgroundColor: '#121212' },
  navbar: { ...lightStyles.navbar, backgroundColor: '#1e1e1e', borderBottomColor: '#333' },
  logo: { color: '#fff' },
  toggleIcon: { color: '#fff' },
  greeting: { color: '#fff' },
  balanceCard: { ...lightStyles.balanceCard, backgroundColor: '#03dac6' },
  balanceTitle: { color: '#000' },
  balanceAmount: { color: '#000' },
  incomeCard: { ...lightStyles.incomeCard, backgroundColor: '#1e5631' },
  expenseCard: { ...lightStyles.expenseCard, backgroundColor: '#7c1c1c' },
  smallTitle: { color: '#fff' },
  incomeAmount: { color: '#d1e7dd' },
  expenseAmount: { color: '#f8d7da' },
  progressBar: { backgroundColor: '#333' },
  progressFill: { backgroundColor: '#03dac6' },
  savingsFill: { backgroundColor: '#00c853' },
  progressText: { color: '#bbb' },
  investmentCard: { ...lightStyles.investmentCard, backgroundColor: '#1e1e1e' },
  investmentAmount: { color: '#fff' },
  transactionText: { color: '#eee' },
  quickButton: { backgroundColor: '#03dac6' },
  quickButtonText: { color: '#000' },
  placeholderText: { color: '#aaa' },
});


