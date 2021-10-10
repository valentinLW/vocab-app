import { colors } from "../colors"
import { translations } from "../translations"
import '../css/Card.css'

export function Card({card}) {
  const from_lang = card.language_code.substring(0,2);
  const to_lang = card.language_code.substring(3,5);
  return (
    <div className="card">
      <div className="card-prompt">
        <p className="card-question" style={{borderColor: colors[card.color]}}>{card.from}</p>
        <p className="card-language">{translations[from_lang]["prompts"][to_lang]}</p>
      </div>
    </div>
  )
}
