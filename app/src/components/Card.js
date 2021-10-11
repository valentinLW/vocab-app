import { colors } from "../colors"
import { translations } from "../translations"
import '../css/Card.css'

export function Card({card, reverse=false}) {
  const from_lang = card.language_code.substring(0,2);
  const to_lang = card.language_code.substring(3,5);
  const cardQuestion = reverse ? card.to : card.from
  const cardPrompt = reverse ? translations[to_lang]["prompts"][from_lang] : translations[from_lang]["prompts"][to_lang]

  return (
    <div className="card">
      <div className="card-prompt">
        <p className="card-question" style={{borderColor: colors[card.color]}}>{cardQuestion}</p>
        <p className="card-language">{cardPrompt}</p>
      </div>
    </div>
  )
}
