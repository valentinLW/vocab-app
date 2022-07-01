import { colors } from "../../colors"
import './Result.css'
import { useEffect } from "react";

export function Result({isCorrect, onNext, reverse=false}) {

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

  return (
    <div className="result">
      <div className="result" style={{backgroundColor: lightColor}}>
        <p className="result-text" style={{color: color}}>{isCorrect ? "correct" : "incorrect"}</p>
        <div className="continue-button" onClick={()=> onNext(isCorrect)} style={{backgroundColor: color}}>continue</div>
      </div>
    </div>
  )
}
