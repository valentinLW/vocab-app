import { colors } from "../../colors"
import { AudioPlayer } from "./AudioPlayer";
import './Result.css'
import { GoCheck, GoX } from "react-icons/go";
import { useEffect } from "react";

export function Result({card, isCorrect, onNext, reverse=false}) {

  useEffect(() => {
    const onKeyDown = ({keyCode}) => {
      if(keyCode === 13) {
        onNext(isCorrect);
      }
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  })

  const color = isCorrect ? colors["green"] : colors["red"]
  const lightColor = isCorrect ? colors["lightgreen"] : colors["lightred"]

  const fromWord = reverse ? card.to : card.from
  const toWord = reverse ? card.from : card.to

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
        <p className="correction-from" style={{color: color}}>{fromWord} meaning:</p>
        <p className="correction-to" style={{color: color}}>{toWord}</p>
      </div>
    </div>
  )
}
