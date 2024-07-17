import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated, // Importar Animated desde React Native
} from 'react-native';
//  StyleSheet puede darle estilo a objetos 
//  TouchableOpacity Botones 
const allQuestions = [
  // Preguntas del cuestionario
  {
    id: 1,
    question: "¿Qué son las 'mingas' en la cultura de Chiloé?",
    options: ['Fiestas religiosas', 'Jornadas de trabajo comunitario', 'Danzas tradicionales', 'Rituales de pesca'],
    correctAnswer: 'Jornadas de trabajo comunitario',
  },
  {
    id: 2,
    question: '¿Cuál es el nombre del famoso plato típico de Chiloé que se cocina en un hoyo en la tierra?',
    options: ['Cazuela', 'Curanto', 'Empanada', 'Asado'],
    correctAnswer: 'Curanto',
  },
  {
    id: 3,
    question: '¿Cómo se llaman las iglesias de madera de Chiloé que son Patrimonio de la Humanidad?',
    options: ['Capillas del Sur', 'Iglesias de Castro', 'Iglesias de Chiloé', 'Templos de Chiloé'],
    correctAnswer: 'Iglesias de Chiloé',
  },
  {
    id: 4,
    question: '¿Qué criatura mitológica es conocida por habitar en los bosques de Chiloé?',
    options: ['El Trauco', 'La Pincoya', 'El Roto', 'El Caleuche'],
    correctAnswer: 'El Trauco',
  },
  {
    id: 5,
    question: '¿Qué material es comúnmente utilizado en la construcción de las casas en Chiloé?',
    options: ['Adobe', 'Piedra', 'Madera', 'Ladrillo'],
    correctAnswer: 'Madera',
  },
  {
    id: 6,
    question: '¿Cuál es la principal actividad económica en la isla de Chiloé?',
    options: ['Agricultura', 'Pesca', 'Turismo', 'Minería'],
    correctAnswer: 'Pesca',
  },
  {
    id: 7,
    question: '¿Cómo se llama la festividad religiosa más importante en Chiloé?',
    options: ['La Candelaria', 'Semana Santa', 'Navidad', 'La Virgen de los Cisnes'],
    correctAnswer: 'La Candelaria',
  },
  {
    id: 8,
    question: '¿Qué animal es emblemático de Chiloé y protagonista de muchas leyendas?',
    options: ['Puma', 'Huillín', 'Quirquincho', 'Chochos'],
    correctAnswer: 'Huillín',
  },
  {
    id: 9,
    question: '¿Qué tipo de artesanía es típica de Chiloé y está hecha de madera?',
    options: ['Cestería', 'Cerámica', 'Carpintería', 'Pintura'],
    correctAnswer: 'Carpintería',
  },
  {
    id: 10,
    question: '¿Qué instrumento musical es característico de la música chilota?',
    options: ['Guitarra', 'Acordeón', 'Charango', 'Piano'],
    correctAnswer: 'Acordeón',
  },
];
// Las preguntas aleatorias 
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
// Declara a QuizzScreen como componente 
// slice muestra las 5 preguntas 
//map (q) itera sobre cada elemento y toma una copia en aleatorio 
// luego comienzan las declaraciones de iniciacion, indice, puntaje
export default class QuizScreen extends Component {
  state = {
    questions: shuffleArray(allQuestions)
      .slice(0, 5)
      .map((q) => ({ ...q, options: shuffleArray(q.options) })),
    currentQuestionIndex: 0,
    score: 0,
    showModal: false,
    modalMessage: '',
    quizCompleted: false,
    selectedOption: null,
    correctAnswers: 0,
    incorrectAnswers: 0,
    progress: new Animated.Value(0), // Inicializar Animated.Value para la animación
  };
// propiedad que entrega acceso al DOM que es como un arbol
// const question accede de manera directa al componente 
// define total de preguntas igual a la longitud de pregunta 
// incial progress entrega el principio del proceso 
// animated.timing permite animar un objeto a lo largo del tiempo
  componentDidMount() {
    // Set initial progress based on first question
    const { questions } = this.state;
    const totalQuestions = questions.length;
    const initialProgress = 1 / totalQuestions;
    Animated.timing(this.state.progress, {
      toValue: initialProgress,
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: false, // Necesario para Android
    }).start(); // Comenzar la animación
  }
// seleccionar opciones y verificar si esta correcto o incorrecto 
// desglosa un objeto en sus propiedades 
  selectOption = (option) => {
    const {
      currentQuestionIndex,
      questions,
      score,
      correctAnswers,
      incorrectAnswers,
    } = this.state;
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
//  si es correcto 'opcion' igual a pregunta[2].respuestacorrecta 
// Actualiza el estado del componente 
// opcionseleccionada = opcion 
// set time out utiliza 1500 milisegundos patra actualizar 
// this set state actualiza sobre el estado anterior 
// constantes nextIndex calcula el proximo indice de pregunta 
    this.setState(
      {
        selectedOption: option,
        showModal: true,
        modalMessage: isCorrect ? '✔️ ¡¡¡Tu respuesta es correcta!!!' : '❌ Tu respuesta es incorrecta...',
        score: isCorrect ? score + 1 : score,
        correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
        incorrectAnswers: isCorrect ? incorrectAnswers : incorrectAnswers + 1,
      },
      () => {
        setTimeout(() => {
          this.setState((prevState) => {
            const nextIndex = prevState.currentQuestionIndex + 1;
            if (nextIndex < questions.length) {
              const totalQuestions = questions.length;
              const progress = (nextIndex + 1) / totalQuestions; // Calcular nuevo progreso para el avance de la barra de progreso 
              Animated.timing(this.state.progress, {
                toValue: progress,
                duration: 1000, // Duración de la animación en milisegundos
                useNativeDriver: false, // Necesario para Android
              }).start(); // Comenzar la animación
              return {
                currentQuestionIndex: nextIndex, // tomamos next index 
                selectedOption: null,
                showModal: false,
              };
            } else {
              return { quizCompleted: true, showModal: false };
            }
          });
        }, 1500);
      }
    );
  };
// sino, el quizz esta completado (True) 
// propiedad que lleva de nuevo a la pantalla de inicio 
  goBackToHome = () => {
    const { correctAnswers, incorrectAnswers } = this.state;
    this.props.navigation.navigate('Inicio', {
      correctAnswers,
      incorrectAnswers,
    });
  };
// utiliza preguntas correctas e incorrectas como parametros 

  render() {
    const {
      questions,
      currentQuestionIndex,
      score,
      showModal,
      modalMessage,
      quizCompleted,
      selectedOption,
    } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    if (questions.length === 0)
      return (
        <View style={styles.loadingContainer}>
          <Text>Cargando preguntas...</Text>
        </View>
      );
// desglosa propiedades del QuizzScreen 
    return (
      <View style={styles.container}>
        <View style={styles.questionCounter}>
          <Text style={styles.questionCounterText}>
            Pregunta {currentQuestionIndex + 1}/{questions.length}
          </Text>
        </View>
        {!quizCompleted ? (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedOption === option &&
                      (option === currentQuestion.correctAnswer
                        ? styles.correctOptionButton
                        : styles.incorrectOptionButton),
                  ]}
                  onPress={() => this.selectOption(option)}
                  disabled={selectedOption !== null}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.scoreContainer}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>Tu puntuación: {score} / 5</Text>
            </View>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={this.goBackToHome}>
              <Text style={styles.menuButtonText}>Volver al Menú Principal</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal visible={showModal} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: this.state.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0DC4D9',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50', // Color verde
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#eee',
    margin: 5,
    width: 150,
    alignItems: 'center',
    borderRadius: 20, // Hace los botones redondeados
    borderWidth: 1,
    borderColor: '#ccc', // Color del borde
    elevation: 2, // Sombra para destacar sobre el fondo
  },
  correctOptionButton: {
    backgroundColor: '#4CAF50', // Verde para respuesta correcta
    borderColor: '#388E3C', // Borde verde más oscuro
  },
  incorrectOptionButton: {
    backgroundColor: '#FF5252', // Rojo para respuesta incorrecta
    borderColor: '#D32F2F', // Borde rojo más oscuro
  },
  optionText: {
    fontSize: 16,
    color: '#333', // Color del texto
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalMessage: {
    fontSize: 18,
    textAlign: 'center',
  },
  questionCounter: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  questionCounterText: {
    color: '#fff',
    fontSize: 16,
  },
});
