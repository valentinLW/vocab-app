import '../css/Answer.css'

export function Answer({answer, onClick}) {
  return (
    <div className="answer" onClick={onClick}>
      {answer}
    </div>
  )
}
