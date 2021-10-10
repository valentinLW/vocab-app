import { AudioPlayer } from "./AudioPlayer";

export function Result({card, isCorrect, onNext}) {
  return (
    <div style={{backgroundColor: isCorrect ? "green" : "red"}}>
      <div className="result-from">{card.from}</div>
      <div className="result-to">{card.to}</div>
      <AudioPlayer url={card.audio} playOnStart={true}/>
      <div className="continue-button" onClick={()=> onNext(isCorrect)}>continue</div>
    </div>
  )
}
