import { useEffect, useState } from "react"
import { BiCheck } from "react-icons/bi";
import '../css/TypeQuiz.css'

export function TypeQuiz({answered=false, reverse=false, onAnswer, card}) {
  const answer = reverse ? card.from : card.to
  const [input, setInput] = useState("");
  const handleChange = ({target}) => {
    setInput(target.value);
  }

  useEffect(()=>{
    setInput("");
  },[card])

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswer(answer === input);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="quiz-form">
        <input className="quiz-input" type="text" onChange={handleChange} value={input}/>
        <div className="submit-input" onClick={handleSubmit}><BiCheck size={40}/></div>
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  )
}
