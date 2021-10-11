import { useState } from "react"

export function NewBoxForm(params) {
  const [name, setName] = useState("")
  const handleNameChange = ({target}) => {
    setName(target.value);
  }

  const [language, setLanguage] = useState("")
  const handleLanguageChange = ({target}) => {
    setLanguage(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="text" value={language} onChange={handleLanguageChange} />
      <button type="submit" style={{display: "none"}}/>
      <div className="new-box-button">create box</div>
    </form>
  )
}
