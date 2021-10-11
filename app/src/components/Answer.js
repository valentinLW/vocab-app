import { useState } from 'react'
import { colors } from "../colors"
import '../css/Answer.css'

export function Answer({word, onAnswer, color, isCorrect, disabled}) {
  const [bgColor, setBgColor] = useState("aliceblue")

  const handleClick = () => {
    if(disabled) return
    setBgColor(isCorrect ? colors["green"] : colors["red"])
    onAnswer(isCorrect)
  }

  const setColorTo = (color) => {
    if(disabled || bgColor === colors["green"] || bgColor === colors["red"]) return
    else {
      setBgColor(color)
    }
  }

  return (
    <div
      className="answer"
      onMouseOver={() => setColorTo(colors[color])}
      onMouseLeave={() => setColorTo("aliceblue")}
      style={{backgroundColor: bgColor, cursor: disabled ? "default" : "pointer"}}
      onClick={handleClick}>
      {word}
    </div>
  )
}
