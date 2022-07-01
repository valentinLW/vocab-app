import { useState } from "react"
import { APInewBox } from "../../api/API";
import { useHistory } from "react-router-dom"
import './NewBox.css'
import { GoX, GoCheck } from "react-icons/go";

export function NewBox(params) {
  const history = useHistory()
  const [name, setName] = useState("")
  const handleNameChange = ({target}) => {
    setName(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const language = "en-pt"
    APInewBox(name, language).then(({box}) => {
      history.push(`/boxes/${box.id}/manage`)
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="new-box-form">
        <input type="text" value={name} onChange={handleNameChange} placeholder="box name" id="box-form-name"/>
      </form>
      <div className="new-box-buttons">
        <GoX size={'2.5rem'} className="new-box-button" onClick={()=> {history.push("/boxes")}}></GoX>
        <GoCheck size={'2.5rem'} className="new-box-button" onClick={handleSubmit}></GoCheck>
      </div>
    </div>

  )
}
