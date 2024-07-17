import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { storeData } from './asyncStorage'; // Ajusta la ruta según la ubicación de asyncStorage.js

export default class SignupScreen extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword });
  };

  handleSignupPress = async () => {
    const { email, password, confirmPassword } = this.state;

    // Validar que los campos no estén vacíos y que las contraseñas coincidan
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Almacenar en AsyncStorage
    try {
      await storeData('userEmail', email);
      Alert.alert(
        'Éxito',
        'Cuenta creada exitosamente.',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear la cuenta.');
      console.error('Error storing email:', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Crear Cuenta</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Correo electrónico"
            placeholderTextColor="#003f5c"
            onChangeText={this.handleEmailChange}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Contraseña"
            placeholderTextColor="#003f5c"
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#003f5c"
            onChangeText={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.signupBtn} onPress={this.handleSignupPress}>
          <Text style={styles.signupText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fb5b5a',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  signupText: {
    color: 'white',
  },
});