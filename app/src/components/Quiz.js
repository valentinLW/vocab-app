import { Answer } from "./Answer";
import '../css/Quiz.css'

export function Quiz({allCards, card, onAnswer, answered, reverse}) {
  return (
    <div className="quiz">
      <div className="answers">
        {allCards.map((aCard, i) => {
          const word  = reverse ? aCard.from : aCard.to
          const isCorrect = reverse ? word === card.from : word === card.to
          return <Answer
            key ={`answer-${i}-${word}`}
            onAnswer={onAnswer}
            word={word}
            isCorrect={isCorrect}
            color={card.color}
            disabled={answered}
            />
        })}
      </div>
    </div>
  )
}
