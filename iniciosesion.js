import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, Button, Image } from 'react-native';

import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';
import StatsScreen from './StatsScreen';
import NaturalQuizScreen from './NaturalQuizScreen';
import LoginScreen from './LoginScreen'; // Importa la pantalla de inicio de sesión

const Stack = createStackNavigator();

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="NaturalQuiz" component={NaturalQuizScreen} options={{ title: 'Patrimonio Natural' }} />
        <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Estadísticas' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Patrimonio Cultural' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
