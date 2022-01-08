import { useState } from "react"
import { APInewBox } from "../../api/API";
import { useHistory } from "react-router-dom"
import './NewBoxForm.css'
import { GoPlus } from "react-icons/go";

export function NewBoxForm(params) {
  const history = useHistory()
  const [name, setName] = useState("")
  const handleNameChange = ({target}) => {
    setName(target.value);
  }

  const [to, setTo] = useState("pt")
  const handleToChange = ({target}) => {
    setTo(target.value);
  }

  const [from, setFrom] = useState("en")
  const handleFromChange = ({target}) => {
    setFrom(target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const language = `${from}-${to}`
    APInewBox(name, language).then(({box}) => {
      history.push(`/boxes/${box.id}/manage`)
    });
  }

  return (
    <form onSubmit={handleSubmit} className="new-box-form">
      <input type="text" value={name} onChange={handleNameChange} placeholder="name"/>
      <p>from:</p>
      <select value={from} onChange={handleFromChange}>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="en">English</option>
        <option value="pt">Portuguese</option>
      </select>
      <p>to:</p>
      <select value={to} onChange={handleToChange}>
        <option value="es">Spanish</option>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="pt">Portuguese</option>
      </select>
      <button type="submit" style={{display: "none"}}/>
      <GoPlus className="new-box-button" onClick={handleSubmit}></GoPlus>
    </form>
  )
}
