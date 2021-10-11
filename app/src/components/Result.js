import { colors } from "../colors"
import { AudioPlayer } from "./AudioPlayer";
import '../css/Result.css'
import { GoCheck, GoX } from "react-icons/go";

export function Result({card, isCorrect, onNext}) {
  const color = isCorrect ? colors["green"] : colors["red"]
  const lightColor = isCorrect ? colors["lightgreen"] : colors["lightred"]

  return (
    <div className="result-wrapper">
      <div className="result" style={{backgroundColor: lightColor}}>
        <div className="result-icon" style={{backgroundColor: color}}>
          {isCorrect ? <GoCheck size={70}/> : <GoX size={70}/>}
        </div>
        <p className="result-text" style={{color: color}}>{isCorrect ? "correct" : "incorrect"}</p>
        <AudioPlayer url={card.audio} playOnStart={true} display={false}/>
        <div className="continue-button" onClick={()=> onNext(isCorrect)} style={{backgroundColor: color}}>continue</div>
      </div>

      <div className="correction">
        <p className="correction-from" style={{color: color}}>{card.from} meaning:</p>
        <p className="correction-to" style={{color: color}}>{card.to}</p>
      </div>
    </div>
  )
}
