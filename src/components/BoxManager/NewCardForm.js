import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { APInewCard } from "../../api/API";
import './NewCardForm.css'

export function NewCardForm({boxId, onNewCard}) {
  const [from, setFrom] = useState("");
  const handleFromChange = ({target}) => {
    setFrom(target.value)
  }

  const [to, setTo] = useState("");
  const handleToChange = ({target}) => {
    setTo(target.value)
  }

  const [definition, setDefinition] = useState("");
  const handleDefinitionChange = ({target}) => {
    setDefinition(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    APInewCard(boxId, from, to, definition).then((card) => {
      onNewCard(card);
    })
    setFrom("");
    setTo("");
    setDefinition("");
    ref.current.focus();
  }

  const ref = useRef(null);

  return (
    <form onSubmit={handleSubmit} className="new-card-form">
      <input ref={ref} type="text" placeholder="from" value={from} onChange={handleFromChange}/>
      <input type="text" placeholder="to" value={to} onChange={handleToChange}/>
      <input type="text" placeholder="definition" value={definition} onChange={handleDefinitionChange}/>
      <button type="submit" style={{display: "none"}}/>
      <GoPlus className="card-submit-button" onClick={handleSubmit}/>
    </form>
  )
}
