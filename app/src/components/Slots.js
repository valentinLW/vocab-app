import '../css/Slots.css'
import { CardStack } from './CardStack'

export function Slots({cards, intervals}) {
  const getSlotCards = (level) => {
    return cards.filter((card) => card.level === level).sort((a, b) => (a.level > b.level) ? 1 : -1)
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
            <h3>Level {level}</h3>
            <p>{cards.length} {cards.length === 1 ? "card" : "cards"}</p>
            <CardStack cards={cards}/>
            <p>repeat {formatMinutes(intervals[index])}</p>
          </div>
        )
      })}
    </div>
  )
}
