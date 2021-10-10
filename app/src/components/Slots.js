import '../css/Slots.css'

export function Slots({cards, intervals}) {
  const countCards = (level) => {
    return cards.filter((card) => card.level === level).length
  }

  const count = [
    countCards(1),
    countCards(2),
    countCards(3),
    countCards(4),
    countCards(5),
  ]

  const formatMinutes = (minutes) => {
    if (minutes === 0) {
      return "immediately"
    } else if(minutes < 60) {
      return `after: ${minutes} ${minutes === 1 ? "minute" : "minutes"}`
    } else if (minutes < (60*24)) {
      const hours = minutes/60
      return `after: ${hours} ${hours === 1 ? "hour" : "hours"}`
    } else {
      const days = minutes/60/24
      return `after: ${days} ${days === 1 ? "day" : "days"}`
    }
  }

  return (
    <div className="slots">
      {count.map((count, index) => {
        const level = index + 1;
        return (
          <div key={`slot-level-${level}`} className="slot">
            <h3>Level: {level}</h3>
            <p>{count}</p>
            <p>repeat {formatMinutes(intervals[index])}</p>
          </div>
        )
      })}
    </div>
  )
}
