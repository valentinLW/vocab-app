import { useState } from "react"
import { APInewBox } from "../api/API";
import { useHistory } from "react-router-dom"


export function NewBoxForm(params) {
  const history = useHistory()
  const [name, setName] = useState("")
  const handleNameChange = ({target}) => {
    setName(target.value);
  }

  const [to, setTo] = useState("")
  const handleToChange = ({target}) => {
    setTo(target.value);
  }

  const [from, setFrom] = useState("")
  const handleFromChange = ({target}) => {
    setFrom(target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const language = `${from}-${to}`
    APInewBox(name, language).then(({box}) => {
      console.log(box)
      history.push(`/boxes/${box.id}`)
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleNameChange} />
      <select value={from} onChange={handleFromChange}>
        <option value="es">Spanish</option>
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
      <select value={to} onChange={handleToChange}>
        <option value="es">Spanish</option>
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
      <button type="submit" style={{display: "none"}}/>
      <div className="new-box-button" onClick={handleSubmit}>create box</div>
    </form>
  )
}
