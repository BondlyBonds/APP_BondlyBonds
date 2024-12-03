import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BondlyBonds</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserSignup')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  button: { backgroundColor: '#1e90ff', padding: 10, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16 },
});
