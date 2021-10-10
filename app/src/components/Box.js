import { useState, useEffect } from "react"
import { APIgetBox, APIupdateCard } from "../api/API";
import { Card } from "./Card";
import { Queue } from "./Queue";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";
import '../css/Box.css'
import { Result } from "./Result";

export function Box({id=1}) {
  const [cards, setCards] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [randomWords, setRandomWords] = useState([])

  const intervals = [0, 5, 30, 1440, 7200] // static for now
  // const queue = cards.filter((c) => {
  //   const nextTest = Date.parse(c.updated_at) + intervals[c.level-1]*60000;
  //   return nextTest <= Date.now()
  // }).sort((a, b) => (a.level > b.level) ? 1 : -1)
  const queue = cards.sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)

  const currentCard = queue[0]

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id])

  const handleAnswer = (correct) => {
    APIupdateCard(currentCard.id, correct);
    setAnswered(correct ? "correct" : "incorrect");
    console.log("correct?", correct)
  }

  const handleNext = (correct) => {
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
    setAnswered(false);
  }

  useEffect(() => {
    const getRandomCard = () => {
      const num = Math.floor(Math.random() * cards.length);
      const card = cards[num]
      return card.id === currentCard.id ? getRandomCard() : card
    }

    const getRandomWords = () => {
      const a = []
      for (var i = 0; i < 3; i++) {
        a.push(getRandomCard().to)
      }
      const randomIndex = Math.floor(Math.random() * 3);
      return [...a.slice(0, randomIndex), currentCard.to, ...a.slice(randomIndex)];
    }

    if(cards.length === 0) return
    setRandomWords(getRandomWords);
  }, [cards, currentCard])

  if (cards.length === 0) {
    return (<h3>Loading...</h3>)
  }

  if(queue.length === 0) {
    return (<h3>No queue...</h3>)
  }

  return (
    <div className="box">
      <div className="allcards">
        <Card card={currentCard}/>
        <Quiz card={currentCard} allWords={randomWords} onAnswer={handleAnswer}/>
        {answered && <Result card={currentCard} onNext={handleNext} isCorrect={answered === "correct"}/>}
      </div>
      <div className="box-visuals">
        <Queue queue={queue}/>
        <Slots cards={cards} intervals={intervals}/>
      </div>
    </div>
  )
}
