import './MasteryButton.css'

export function MasteryButton({text, onClick}) {

  return (
    <div className="mastery" onClick={onClick}>
      <div className="mastery-button">{text}</div>
    </div>
  )
}
