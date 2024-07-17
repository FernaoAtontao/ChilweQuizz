import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Text, View, StyleSheet, Button, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import QuizScreen from './QuizScreen';
import StatsScreen from './StatsScreen';
import NaturalQuizScreen from './NaturalQuizScreen';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="PatrimonioNatural" component={NaturalQuizScreen} options={{ title: 'Patrimonio Natural' }} />
      <Stack.Screen name="Estadísticas" component={StatsScreen} options={{ title: 'Estadísticas' }} />
      <Stack.Screen name="PatrimonioCultural" component={QuizScreen} options={{ title: 'Patrimonio Cultural' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

const HomeScreen = ({ navigation, route }) => {
  const { correctAnswers = 0, incorrectAnswers = 0 } = route.params || {};
  const [touchCount, setTouchCount] = useState(0);
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    let timer;
    if (touchCount >= 5) {
      setShowGif(true);
      timer = setTimeout(() => {
        setShowGif(false);
        setTouchCount(0);
      }, 3000); // Show GIF for 3 seconds
    }
    return () => clearTimeout(timer);
  }, [touchCount]);

  const handleLogoPress = () => {
    setTouchCount(touchCount + 1);
  };

  const confirmNavigation = (quizType, title) => {
    Alert.alert(
      "Confirmación",
      `¿Deseas entrar a este quiz de ${title}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => navigation.navigate(quizType)
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground source={require('./assets/360_F_279063271_wFjyjR70hw2i9QCL5K4X598ZTsEyRJHE_waifu2x_photo_noise3_scale.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        {showGif && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Image source={require('./assets/among-us-sus.gif')} style={styles.gif} />
          </Animated.View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ChilweQuizz</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Patrimonio Cultural  🏛️ "
            onPress={() => confirmNavigation('PatrimonioCultural', 'Patrimonio Cultural')}
            color="#DC1F63"
            style={styles.roundedButton}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Patrimonio Natural  🌲"
            onPress={() => confirmNavigation('PatrimonioNatural', 'Patrimonio Natural')}
            color="#FF7700"
            style={styles.roundedButton}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Ver Estadísticas  📈"
            onPress={() => navigation.navigate('Estadísticas', { correctAnswers, incorrectAnswers })}
            color="#84CC16"
            style={styles.roundedButton}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(13, 196, 217, 0.8)', // Fondo semi-transparente
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 20,
    position: 'absolute',
    top: '30%', // Adjust this value to position the GIF correctly
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semi-transparente blanco
    padding: 10,
    borderRadius: 10,
    marginBottom: 45,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E67100',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  roundedButton: {
    borderRadius: 20,
  },
});
