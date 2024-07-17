// HomeScreen.js (o cualquier otra pantalla donde necesites acceder al usuario)
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserContext from './UserContext'; // Importa el contexto

export default function HomeScreen() {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido, {user ? user.email : 'Invitado'}</Text>
      {/* Resto de tu UI */}
    </View>
  );
}
