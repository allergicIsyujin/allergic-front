import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

const App = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.hi}>음식을 분석중입니다...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FFFFF', 
  },
  hi: {
    color: '#00000',
    marginTop: 20, 
  },
});

export default App;