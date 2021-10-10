import { colors } from "../colors"
import '../css/Queue.css'

export function Queue({queue}) {
  return (
    <div className="queue">
      <h3>Queue: {queue.length}</h3>
      <div className="queue-cards">
        {queue.slice(0, queue.length).map((card) => {
          return (
            <div key={`queue-card-${card.id}`} className="queue-card" style={{backgroundColor: colors[card.color]}}/>
          )
        })}
      </div>
    </div>
  )
}
