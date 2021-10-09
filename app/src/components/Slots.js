import '../css/Slots.css'

export function Slots({cards}) {
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

  return (
    <div className="slots">
      {count.map((count, index) => {
        const num = index + 1;
        return (
          <div key={`slot-${num}`} className="slot"><p>{num}</p><p>{count}</p></div>
        )
      })}
    </div>
  )
}
