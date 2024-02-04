function Choices ({ choices, onAnswerSelected, selectedAnswerIndex}) {
    return (
        <ul>
            {choices.map((answer, index) => (
                <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                    {answer}
                </li>
            ))}
        </ul>
    )
}
export default Choices;
