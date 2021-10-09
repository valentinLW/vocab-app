import { colors } from "../colors"
import '../css/Card.css'

export function Card({card}) {
  return (
    <div className="card" style={{backgroundColor: colors[card.color]}}>
      <p className="card-level">{card.level}</p>
      <p className="card-prompt">Choose the right translation</p>
      <p className="card-question">{card.from}</p>
    </div>
  )
}
