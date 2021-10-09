import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";
import { Card } from "./Card";
import { Quiz } from "./Quiz";

export function Box({id=1}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id])


  const handleAnswer = (card, correct) => {
    const index = cards.findIndex((prevCard) => prevCard.id === card.id);
    setCards((prevState) => {
      const a = [...prevState]
      const prevCard = a[index]

      const limit = correct ? 5 : 1
      const add = correct ? 1 : - 1
      const newLevel = card.level === limit ? limit : card.level + add

      a[index] = {...prevCard, level: newLevel}
      return a
    })
  }

  if (cards.length === 0) {
    return (<h3>Loading...</h3>)
  }

  return (
    <div className="allcards">
      <Card card={cards[0]}/>
      <Quiz card={cards[0]} words={cards.slice(1,4).map(w=>w.to)} onAnswer={handleAnswer}/>
      </div>
  )
}
