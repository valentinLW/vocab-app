import '../css/Slots.css'
import { CardStack } from './CardStack'
import { GoInfo } from 'react-icons/go'
import { useState } from 'react'

export function Slots({cards, intervals, quiztypes}) {
  const getSlotCards = (level) => {
    return cards.filter((card) => card.level === level).sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)
  }

  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => {
    setShowInfo((prevState) => !prevState)
  }

  const slotCards = [
    getSlotCards(1),
    getSlotCards(2),
    getSlotCards(3),
    getSlotCards(4),
    getSlotCards(5),
  ]

  const formatMinutes = (minutes) => {
    if (minutes === 0) {
      return "immediately"
    } else if(minutes < 60) {
      return `after ${minutes} ${minutes === 1 ? "minute" : "minutes"}`
    } else if (minutes < (60*24)) {
      const hours = minutes/60
      return `after ${hours} ${hours === 1 ? "hour" : "hours"}`
    } else {
      const days = minutes/60/24
      return `after ${days} ${days === 1 ? "day" : "days"}`
    }
  }

  return (
    <div className="slots">
      {slotCards.map((cards, index) => {
        const level = index + 1;
        return (
          <div key={`slot-level-${level}`} className="slot">
            <div className="slot-header">
              <h3>Level {level}</h3>
              <GoInfo size={20} onClick={toggleInfo}/>
            </div>
            <div style={{position: "relative"}}>
              <div style={{filter: showInfo ? "blur(5px)" : ""}}>
                <CardStack cards={cards}/>
                <p>repeat {formatMinutes(intervals[index])}</p>
              </div>
              <div style={{opacity: showInfo ? 100 : 0, position: "absolute", top:-10, left:0, right:0}}>
                <p>{cards.length} cards</p>
                <p>repeat {formatMinutes(intervals[index])}</p>
                <p>Quiz type: {quiztypes[index]}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
