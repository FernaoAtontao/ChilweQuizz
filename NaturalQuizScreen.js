import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';

const allQuestions = [
  {
    id: 1,
    question: '¿Cuál es el árbol más antiguo de Chiloé?',
    options: ['Alerce', 'Canelo', 'Coigüe', 'Tepa'],
    correctAnswer: 'Alerce',
  },
  {
    id: 2,
    question: '¿Qué ave endémica de Chiloé es conocida por su canto melodioso?',
    options: ['Chucao', 'Cóndor', 'Pato', 'Zorzal'],
    correctAnswer: 'Chucao',
  },
  {
    id: 3,
    question: '¿Qué parque nacional en Chiloé es famoso por su biodiversidad?',
    options: [
      'Parque Nacional Puyehue',
      'Parque Nacional Queulat',
      'Parque Nacional Chiloé',
      'Parque Nacional Vicente Pérez Rosales',
    ],
    correctAnswer: 'Parque Nacional Chiloé',
  },
  {
    id: 4,
    question: '¿Qué mamífero marino es comúnmente visto en las costas de Chiloé?',
    options: ['Lobo marino', 'Delfín', 'Ballena jorobada', 'Orca'],
    correctAnswer: 'Lobo marino',
  },
  {
    id: 5,
    question: '¿Cuál es el nombre del bosque siempreverde que se encuentra en Chiloé?',
    options: ['Bosque templado', 'Bosque lluvioso', 'Bosque seco', 'Bosque esclerófilo'],
    correctAnswer: 'Bosque templado',
  },
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

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
    progress: new Animated.Value(0),
  };

  componentDidMount() {
    const { questions } = this.state;
    const totalQuestions = questions.length;
    const initialProgress = 1 / totalQuestions;
    Animated.timing(this.state.progress, {
      toValue: initialProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  selectOption = (option) => {
    const {
      currentQuestionIndex,
      questions,
      score,
      correctAnswers,
      incorrectAnswers,
    } = this.state;
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;

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
              const progress = (nextIndex + 1) / totalQuestions;
              Animated.timing(this.state.progress, {
                toValue: progress,
                duration: 1000,
                useNativeDriver: false,
              }).start();
              return {
                currentQuestionIndex: nextIndex,
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

  goBackToHome = () => {
    const { correctAnswers, incorrectAnswers } = this.state;
    this.props.navigation.navigate('Inicio', {
      correctAnswers,
      incorrectAnswers,
    });
  };

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
    backgroundColor: '#4CAF50',
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  correctOptionButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  incorrectOptionButton: {
    backgroundColor: '#FF5252',
    borderColor: '#D32F2F',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
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
