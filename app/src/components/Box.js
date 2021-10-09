import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";
import { Card } from "./Card";

export function Box({id=1}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id])

  if (cards.length === 0) {
    return (<h3>Loading...</h3>)
  }

  return (
    <div className="allcards">
      <Card card={cards[0]}/>
    </div>
  )
}
