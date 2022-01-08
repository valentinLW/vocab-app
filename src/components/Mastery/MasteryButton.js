import './MasteryButton.css'

export function MasteryButton({text, onClick, color}) {

  return (
    <div className="mastery-button" onClick={onClick} style={{backgroundColor: color}}>
      <p>{text}</p>
    </div>
  )
}
