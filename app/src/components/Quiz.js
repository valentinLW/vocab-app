import { Answer } from "./Answer";
import '../css/Quiz.css'

export function Quiz({words, card, onAnswer}) {

  const randomIndex = Math.floor(Math.random() * 3);
  const allWords = [...words.slice(0, randomIndex), card.to, ...words.slice(randomIndex)];

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
