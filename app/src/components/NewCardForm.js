import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { APInewCard } from "../api/API";
import '../css/NewCardForm.css'

export function NewCardForm({boxId, onNewCard}) {
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
    APInewCard(boxId, from, to).then((card) => {
      onNewCard(card);
    })
    setFrom("")
    setTo("")
    ref.current.focus()
  }

  const ref = useRef(null);

  return (
    <form onSubmit={handleSubmit} className="new-card-form">
      <input ref={ref} type="text" placeholder="from" value={from} onChange={handleFromChange}/>
      <input type="text" placeholder="to" value={to} onChange={handleToChange}/>
      <button type="submit" style={{display: "none"}}/>
      <GoPlus className="card-submit-button" onClick={handleSubmit}/>
    </form>
  )
}
