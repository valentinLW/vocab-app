import { colors } from "../colors"
import { AudioPlayer } from "./AudioPlayer"
import '../css/Card.css'

export function Card({card}) {
  return (
    <div className="card">
      <div className="card-prompt">
        <p className="card-question" style={{borderColor: colors[card.color]}}>{card.from}</p>
        <p className="card-language">in portugese</p>
      </div>
      <AudioPlayer url={card.audio} />
    </div>
  )
}
