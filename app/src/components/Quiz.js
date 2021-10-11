import { SelectQuiz } from "./SelectQuiz";
import '../css/Quiz.css'

export function Quiz({allCards, card, onAnswer, answered, quizType}) {

  if(quizType === "choose") {
    return <SelectQuiz allCards={allCards} card={card} onAnswer={onAnswer} answered={answered} />
  } else if (quizType === "choose-reverse") {
    return <SelectQuiz allCards={allCards} card={card} onAnswer={onAnswer} answered={answered} reverse={true}/>
  } else {
    return <h3>Incorrect quiz type</h3>
  }
}
