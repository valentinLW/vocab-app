import { useState, useEffect } from "react"
import { APIgetBox, APIupdateCard } from "../api/API";
import { Card } from "./Card";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";

export function Box({id=1}) {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});

  const currentIndex = cards.findIndex(card=> currentCard.id === card.id)

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
      setCurrentCard(cards[Math.floor(Math.random()*cards.length)])
    });
  }, [id])

  const getNextCard = () => {
    setCurrentCard(cards[Math.floor(Math.random()*cards.length)])
  }

  const getRandomCard = () => {
    const num = Math.floor(Math.random() * cards.length);
    return num === currentIndex ? getRandomCard : num
  }

  const getRandomWords = () => {
    const a = []
    for (var i = 0; i < 3; i++) {
      a.push(cards[getRandomCard()].to)
    }
    return a
  }

  const handleAnswer = (card, correct) => {
    setCards((prevState) => {
      const a = [...prevState]
      const prevCard = a[currentIndex]

      const limit = correct ? 5 : 1
      const add = correct ? 1 : - 1
      const newLevel = card.level === limit ? limit : card.level + add

      a[currentIndex] = {...prevCard, level: newLevel}
      return a
    });
    console.log("correct?", correct)
    APIupdateCard(card.id, correct);
    getNextCard();
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
      <Slots cards={cards}/>
    </div>
  )
}
