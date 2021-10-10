import { colors } from "../colors"
import '../css/Queue.css'

export function Queue({queue}) {
  return (
    <div className="queue">
      {queue.slice(1, 11).map((card) => {
        return (
          <div key={`queue-card-${card.id}`} className="queue-card" style={{backgroundColor: colors[card.color]}}/>
        )
      })}
    </div>
  )
}
