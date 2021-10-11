import { useEffect, useState } from "react"
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
    if(answered) return;
    onAnswer(answer === input);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="quiz-form">
        <input className="quiz-input" type="text" onChange={handleChange} value={input} disabled={answered}/>
        <div className="submit-input" onClick={handleSubmit} style={{cursor: answered ? "default" : "pointer"}}>submit</div>
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  )
}
