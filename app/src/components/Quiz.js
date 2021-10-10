import { Answer } from "./Answer";
import '../css/Quiz.css'

export function Quiz({allWords, card, onAnswer}) {
  return (
    <div className="quiz">
      <div className="answers">
        {allWords.map((word, i) =>
          <Answer
            key ={`answer-${i}-${word}`}
            onAnswer={onAnswer}
            word={word}
            isCorrect={word === card.to}
            color={card.color}
            />
          )}
      </div>
    </div>
  )
}
