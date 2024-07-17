import AsyncStorage from '@react-native-async-storage/async-storage';

handleLoginPress = async () => {
  const { email, password } = this.state;

  try {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    if (email === storedEmail && password === 'password') {
      Alert.alert('Inicio de sesión exitoso');
      this.props.navigation.navigate('MainMenu');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  } catch (error) {
    Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
    console.error('Error al iniciar sesión:', error);
  }
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Datos almacenados exitosamente con la clave: ${key}`);
  } catch (error) {
    console.error(`Error al almacenar datos con la clave: ${key}`, error);
    throw error;
  }
};

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Datos recuperados exitosamente con la clave: ${key}`);
      return value;
    } else {
      console.log(`No se encontraron datos con la clave: ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error al recuperar datos con la clave: ${key}`, error);
    throw error;
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Datos eliminados exitosamente con la clave: ${key}`);
  } catch (error) {
    console.error(`Error al eliminar datos con la clave: ${key}`, error);
    throw error;
  }
};

export { storeData, retrieveData, removeData };
