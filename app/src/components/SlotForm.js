import { useState } from "react"
import { APIupdateSlot } from "../api/API";
import '../css/SlotForm.css'

export function SlotForm({slot}) {
  const [quizType, setQuizType] = useState(slot.quiztype);
  const handleChange = ({target}) => {
    APIupdateSlot(slot.id, {quiztype: target.value});
    setQuizType(target.value);
  }

  const [interval, setInterval] = useState(slot.interval);
  const handleIntervalChange = ({target}) => {
    const num = target.value;
    APIupdateSlot(slot.id, {interval: num});
    setInterval(num);
  }

  return (
   <form className="slot-form" onSubmit={(e) => e.preventDefault()}>
    <select value={quizType || undefined} onChange={handleChange}>
      <option value="choose">Choose</option>
      <option value="choose-reverse">Choose reverse</option>
      <option value="type">Type</option>
      <option value="type-reverse">Type reverse</option>
    </select>
    <input type="number" value={interval} onChange={handleIntervalChange}/>
   </form>
  )
}
