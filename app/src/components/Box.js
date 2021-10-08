import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";

export function Box({id=1}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id])

  return (
    <div className="allcards">
      {cards.map((card) => {
        return <p>{card?.from}</p>
      })}
    </div>
  )
}
