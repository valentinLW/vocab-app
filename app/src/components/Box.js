import { useState, useEffect } from "react"
import { APIgetBox, APIupdateCard } from "../api/API";
import { Card } from "./Card";
import { Queue } from "./Queue";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";
import '../css/Box.css'

export function Box({id=1}) {
  const [cards, setCards] = useState([]);

  const intervals = [0, 5, 30, 1440, 7200] // static for now
  const queue = cards.filter((c) => {
    const nextTest = Date.parse(c.updated_at) + intervals[c.level-1]*60000;
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

  const handleAnswer = (correct) => {
    console.log("correct?", correct)
    APIupdateCard(currentCard.id, correct);
    setCards((prevState) => {
      return prevState.map((prevCard) => {
        if (prevCard.id === currentCard.id) {
          const newLevel = correct ? (currentCard.level === 5 ? 5 : currentCard.level + 1 ) : 1
          return {...currentCard, updated_at: new Date().toLocaleString(), level: newLevel}
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
        <Card card={currentCard}/>
        <Quiz card={currentCard} words={getRandomWords()} onAnswer={handleAnswer}/>
      </div>
      <div className="box-visuals">
        <Queue queue={queue}/>
        <Slots cards={cards} intervals={intervals}/>
      </div>
    </div>
  )
}
