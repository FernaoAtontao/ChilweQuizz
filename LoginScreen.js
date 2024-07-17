import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    this.fetchUserEmail();
  }

  fetchUserEmail = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      if (userEmail !== null) {
        this.setState({ email: userEmail });
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al recuperar el correo electrónico.');
      console.error('Error retrieving email:', error);
    }
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleLoginPress = async () => {
    const { email, password } = this.state;

    // Validación básica (simulada con AsyncStorage)
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (email === storedEmail && password === 'password') { // Simulación de contraseña básica
        // Aquí podrías agregar lógica para validar con un servidor o Firebase
        Alert.alert('Inicio de sesión exitoso');
        this.props.navigation.navigate('MainMenu'); // Navega al menú principal
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
      console.error('Error logging in:', error);
    }
  };

  handleSignupPress = () => {
    // Navegar hacia la pantalla de registro (creación de cuenta)
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ChilweQuizz</Text>
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
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLoginPress}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSignupPress}>
          <Text style={styles.signupText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
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
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  signupText: {
    color: 'white',
    marginTop: 15,
  },
});
