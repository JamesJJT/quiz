import { useState } from 'react'
import { questions } from '../data/questions'
import Result from "./Result";
import Choices from "./Choices";

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })

    const { question, choices, correctAnswer } = questions.questions[activeQuestion]
    const onClickNext = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
        if (activeQuestion !== questions.questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }
    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    return (
        <div className="quiz-container">
            {!showResult ? (
                <div>
                    <div>
                        <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                        <span className="total-question">/{addLeadingZero(questions.questions.length)}</span>
                    </div>
                    <h2>{question}</h2>
                    <Choices
                        choices={choices}
                        onAnswerSelected={onAnswerSelected}
                        selectedAnswerIndex={selectedAnswerIndex}
                    />
                    <div className="flex-right">
                        <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                            {activeQuestion === questions.questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            ) : (
                <Result
                    result={result}
                    questions={questions.questions}
                    setShowResult={setShowResult}
                    />
            )}
        </div>
    )
}

export default Quiz
