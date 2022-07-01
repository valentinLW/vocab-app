import { colors } from "../../colors"
import './Card.css'

export function Card({card, reverse=false, answered}) {
  const cardQuestion = reverse ? card.to : card.from
  const cardAnswer = !reverse ? card.to : card.from
 
  return (
    <div className="card" style={{backgroundColor: colors[card.color]}}>
      <div className="card-prompt">
        <p className="card-question">{cardQuestion}</p>
        <p className="card-hint">{card.hint}</p>
        <p className="card-answer" style={{visibility: answered? "visible" : "hidden"}}>{cardAnswer}</p>
      </div>
    </div>
  )
}
