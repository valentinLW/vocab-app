import { useEffect, useRef, useState } from "react"
import '../css/Quiz.css'

export function Quiz({answered=false, reverse=false, onAnswer, card}) {
  const answer = reverse ? card.from : card.to
  const [input, setInput] = useState("");
  const handleChange = ({target}) => {
    setInput(target.value);
  }

  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  })

  useEffect(()=>{
    setInput("");
  },[card])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(answered || input === "") return;
    onAnswer(answer === input);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="quiz-form">
        <input ref={ref} autoFocus className="quiz-input" type="text" onChange={handleChange} value={input} disabled={answered}/>
        <div className="submit-input" onClick={handleSubmit} style={{cursor: answered ? "default" : "pointer"}}>submit</div>
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  )
}
