import { useState, useEffect } from "react"
import { APIgetBox, APIupdateCard } from "../api/API";
import { Card } from "./Card";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";

export function Box({id=1}) {
  const [cards, setCards] = useState([]);

  const queue = cards.filter((c) => {
    const minutes = 2;
    const nextTest = Date.parse(c.updated_at) + minutes*60000;
    return nextTest <= Date.now()
  }).sort((a, b) => (a.level > b.level) ? 1 : -1)

  const currentCard = queue[0]

  const currentIndex = cards.findIndex(card => currentCard.id === card.id)

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id])

  const getRandomCard = () => {
    const num = Math.floor(Math.random() * cards.length);
    return num === currentIndex ? getRandomCard() : num
  }

  const getRandomWords = () => {
    const a = []
    for (var i = 0; i < 3; i++) {
      a.push(cards[getRandomCard()].to)
    }
    return a
  }

  const handleAnswer = (card, correct) => {
    console.log("correct?", correct)
    APIupdateCard(card.id, correct);
    setCards((prevState) => {
      return prevState.map((prevCard) => {
        if (prevCard.id === card.id) {
          const newLevel = correct ? (card.level === 5 ? 5 : card.level + 1 ) : 1
          return {...card, updated_at: new Date().toLocaleString(), level: newLevel}
        } else {
          return prevCard
        }
      })
    })
  }

  if (cards.length === 0) {
    return (<h3>Loading...</h3>)
  }

  return (
    <div className="box">
      <div className="allcards">
        <h2>Queue: {queue.length}</h2>
        <Card card={currentCard}/>
        <Quiz card={currentCard} words={getRandomWords()} onAnswer={handleAnswer}/>
      </div>
      <Slots cards={cards}/>
    </div>
  )
}
