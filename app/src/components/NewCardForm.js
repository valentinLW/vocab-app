import { useState } from "react";
import { GoPlus } from "react-icons/go";
import '../css/NewCardForm.css'

export function NewCardForm() {
  const [from, setFrom] = useState("");
  const handleFromChange = ({target}) => {
    setFrom(target.value)
  }

  const [to, setTo] = useState("");
  const handleToChange = ({target}) => {
    setTo(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="new-card-form">
      <input type="text" placeholder="from" value={from} onChange={handleFromChange}/>
      <input type="text" placeholder="to" value={to} onChange={handleToChange}/>
      <button type="submit" style={{display: "none"}}/>
      <GoPlus className="card-submit-button" onClick={handleSubmit}/>
    </form>
  )
}
