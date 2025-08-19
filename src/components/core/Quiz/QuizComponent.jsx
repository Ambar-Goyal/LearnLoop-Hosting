import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const QuizComponent = () => {
  const { user } = useSelector((state) => state.profile)

  // Quiz questions data
  const quizQuestions = [
    {
      id: 1,
      question: "What is the correct way to create a React component?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "All of the above"
      ],
      correctAnswer: 3
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What is JSX?",
      options: [
        "A JavaScript library",
        "A syntax extension for JavaScript",
        "A CSS framework",
        "A database query language"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Which method is used to update state in a class component?",
      options: [
        "this.updateState()",
        "this.setState()",
        "this.changeState()",
        "this.modifyState()"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "What is the virtual DOM?",
      options: [
        "A copy of the real DOM kept in memory",
        "A new version of HTML",
        "A CSS framework",
        "A JavaScript library"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      question: "Which lifecycle method is called after a component is mounted?",
      options: [
        "componentWillMount",
        "componentDidMount",
        "componentWillUpdate",
        "componentDidUpdate"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: "What is the purpose of keys in React lists?",
      options: [
        "To style list items",
        "To help React identify which items have changed",
        "To sort the list",
        "To filter the list"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "Which hook is used for side effects in functional components?",
      options: [
        "useState",
        "useContext",
        "useEffect",
        "useCallback"
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: "What is prop drilling?",
      options: [
        "A way to optimize React performance",
        "Passing props through multiple component layers",
        "A method to create new components",
        "A debugging technique"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      question: "Which of the following is NOT a React hook?",
      options: [
        "useState",
        "useEffect",
        "useComponent",
        "useContext"
      ],
      correctAnswer: 2
    }
  ]

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question
  const [quizStarted, setQuizStarted] = useState(false)

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCurrentQuestion(progress.currentQuestion || 0)
      setScore(progress.score || 0)
      setCorrectAnswers(progress.correctAnswers || 0)
      setQuizCompleted(progress.quizCompleted || false)
      setQuizStarted(progress.quizStarted || false)
      if (progress.quizCompleted) {
        setShowResult(true)
      }
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let timer
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && !quizCompleted) {
      handleNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, quizStarted, quizCompleted])

  // Save progress to localStorage
  const saveProgress = (progress) => {
    localStorage.setItem('quizProgress', JSON.stringify(progress))
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(30)
    const progress = {
      currentQuestion: 0,
      score: 0,
      correctAnswers: 0,
      quizCompleted: false,
      quizStarted: true
    }
    saveProgress(progress)
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    let newScore = score
    let newCorrectAnswers = correctAnswers

    // Check if answer is correct
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      newScore += 10
      newCorrectAnswers += 1
      toast.success('Correct! +10 points')
    } else if (selectedAnswer !== null) {
      toast.error('Incorrect answer')
    } else {
      toast.error('Time up!')
    }

    const isLastQuestion = currentQuestion === quizQuestions.length - 1

    if (isLastQuestion) {
      // Quiz completed
      setQuizCompleted(true)
      setShowResult(true)
      saveLeaderboardScore(newScore, newCorrectAnswers)
      
      const finalProgress = {
        currentQuestion: currentQuestion,
        score: newScore,
        correctAnswers: newCorrectAnswers,
        quizCompleted: true,
        quizStarted: true
      }
      saveProgress(finalProgress)
    } else {
      // Move to next question
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer(null)
      setTimeLeft(30)
      
      const progress = {
        currentQuestion: nextQuestion,
        score: newScore,
        correctAnswers: newCorrectAnswers,
        quizCompleted: false,
        quizStarted: true
      }
      saveProgress(progress)
    }

    setScore(newScore)
    setCorrectAnswers(newCorrectAnswers)
  }

  const saveLeaderboardScore = (finalScore, finalCorrectAnswers) => {
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]')
    const newEntry = {
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      score: finalScore,
      correctAnswers: finalCorrectAnswers,
      totalQuestions: quizQuestions.length,
      percentage: Math.round((finalCorrectAnswers / quizQuestions.length) * 100),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    }
    
    leaderboard.push(newEntry)
    leaderboard.sort((a, b) => b.score - a.score) // Sort by score descending
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard))
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setCorrectAnswers(0)
    setQuizCompleted(false)
    setShowResult(false)
    setTimeLeft(30)
    setQuizStarted(false)
    localStorage.removeItem('quizProgress')
    toast.success('Quiz reset successfully!')
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent! 🎉'
    if (percentage >= 80) return 'Great job! 👏'
    if (percentage >= 70) return 'Good work! 👍'
    if (percentage >= 60) return 'Not bad! 😊'
    return 'Keep practicing! 💪'
  }

  if (!quizStarted) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-richblack-800 rounded-lg shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-richblack-5 mb-4">
              React Quiz Challenge
            </h1>
            <p className="text-richblack-200 mb-6 text-lg">
              Test your React knowledge with {quizQuestions.length} questions
            </p>
            <div className="bg-richblack-700 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-richblack-5 mb-4">Quiz Rules:</h3>
              <ul className="text-richblack-200 text-left space-y-2">
                <li>• {quizQuestions.length} multiple choice questions</li>
                <li>• 30 seconds per question</li>
                <li>• 10 points for each correct answer</li>
                <li>• Your progress will be saved automatically</li>
                <li>• Results will be added to the leaderboard</li>
              </ul>
            </div>
            <button
              onClick={startQuiz}
              className="bg-yellow-50 text-richblack-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-100 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100)
    
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-richblack-800 rounded-lg shadow-xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-richblack-5 mb-6">
              Quiz Completed! 🎉
            </h2>
            
            <div className="bg-richblack-700 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-50 mb-2">{score}</p>
                  <p className="text-richblack-200">Total Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-richblack-5 mb-2">
                    {correctAnswers}/{quizQuestions.length}
                  </p>
                  <p className="text-richblack-200">Correct Answers</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className={`text-2xl font-bold ${getScoreColor(percentage)} mb-2`}>
                  {percentage}%
                </p>
                <p className="text-lg text-richblack-200">
                  {getScoreMessage(percentage)}
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
              >
                Take Quiz Again
              </button>
              <button
                onClick={() => window.location.href = '/quiz/leaderboard'}
                className="bg-richblack-700 text-richblack-5 px-6 py-3 rounded-lg font-semibold hover:bg-richblack-600 transition-colors"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-richblack-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-richblack-5">
              React Quiz Challenge
            </h1>
            <div className="text-richblack-200">
              Score: <span className="text-yellow-50 font-semibold">{score}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-richblack-700 rounded-full h-2 mb-4">
            <div 
              className="bg-yellow-50 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-richblack-200">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-richblack-200">Time:</span>
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-yellow-50'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-richblack-800 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-richblack-5 mb-6">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-yellow-50 bg-yellow-50 bg-opacity-10 text-richblack-5'
                    : 'border-richblack-600 bg-richblack-700 text-richblack-200 hover:border-richblack-500 hover:bg-richblack-600'
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={resetQuiz}
              className="px-4 py-2 text-richblack-300 hover:text-richblack-5 transition-colors"
            >
              Reset Quiz
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedAnswer !== null
                  ? 'bg-yellow-50 text-richblack-900 hover:bg-yellow-100'
                  : 'bg-richblack-600 text-richblack-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizComponent