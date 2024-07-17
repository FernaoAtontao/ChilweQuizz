import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsScreen = ({ route, navigation }) => {
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalIncorrectAnswers, setTotalIncorrectAnswers] = useState(0);
  const { correctAnswers = 0, incorrectAnswers = 0 } = route.params || {};

  useEffect(() => {
    const updateStats = async () => {
      try {
        const storedCorrectAnswers = await AsyncStorage.getItem('correctAnswers');
        const storedIncorrectAnswers = await AsyncStorage.getItem('incorrectAnswers');

        const newCorrectAnswers = (storedCorrectAnswers ? parseInt(storedCorrectAnswers) : 0) + correctAnswers;
        const newIncorrectAnswers = (storedIncorrectAnswers ? parseInt(storedIncorrectAnswers) : 0) + incorrectAnswers;

        await AsyncStorage.setItem('correctAnswers', newCorrectAnswers.toString());
        await AsyncStorage.setItem('incorrectAnswers', newIncorrectAnswers.toString());

        setTotalCorrectAnswers(newCorrectAnswers);
        setTotalIncorrectAnswers(newIncorrectAnswers);
      } catch (error) {
        console.error('Error updating stats:', error);
      }
    };

    updateStats();
  }, [correctAnswers, incorrectAnswers]);

  const goToHome = () => {
    navigation.navigate('Inicio');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Respuestas Correctas: {totalCorrectAnswers}</Text>
        <Text style={styles.statText}>Respuestas Incorrectas: {totalIncorrectAnswers}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="← Volver ←"
          onPress={goToHome}
          color="#4CAF50" // Color verde para el botón
          style={styles.roundedButton}
        />
      </View>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0DC4D9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E67100',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  statText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  roundedButton: {
    borderRadius: 20,
  },
});
