import { colors } from "../colors"
import '../css/CardStack.css'

export function CardStack({cards, isQueue=false}) {
  return (
    <div className="cardstack">
      {cards.map((card, i) => {
        return (
          <div key={`card-${card.id}`} className={`stack-card${isQueue && i===0 ? " active-card" : ""}`} style={{backgroundColor: colors[card.color], color:"white"}}>{isQueue ? <p>{card.level}</p> : null}</div>
        )
      })}
    </div>
  )
}
