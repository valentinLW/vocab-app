import { useState, useEffect } from "react"
import { APIgetBox, APIupdateCard } from "../api/API";
import { Card } from "./Card";
import { Queue } from "./Queue";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";
import '../css/Box.css'
import { Result } from "./Result";

export function Box({id}) {
  const [cards, setCards] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [randomCards, setRandomCards] = useState([]);

  // static for now
  const bucketSettings = [
    {"interval": 0,"type": "choose"},
    {"interval": 5,"type": "choose-reverse"},
    {"interval": 30,"type": "choose"},
    {"interval": 1440,"type": "choose"},
    {"interval": 7200,"type": "choose"}]

  const queue = cards.filter((c) => {
    const nextTest = Date.parse(c.updated_at) + bucketSettings[c.level-1]["interval"]*60000;
    return nextTest <= Date.now()
  }).sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)
  // const queue = cards.sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)

  const currentCard = queue[0]
  const quizType = currentCard?.level ? bucketSettings[currentCard?.level-1]["type"] : null
  const reverse = quizType === "choose-reverse"

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id]);

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

    const getRandomCards = () => {
      const a = []
      for (var i = 0; i < 3; i++) {
        a.push(getRandomCard())
      }
      const randomIndex = Math.floor(Math.random() * 3);
      return [...a.slice(0, randomIndex), currentCard, ...a.slice(randomIndex)];
    }

    if(cards.length === 0) return
    setRandomCards(getRandomCards);
  }, [cards, currentCard])

  if (cards.length === 0) {
    return (<h3>Loading...</h3>)
  }

  if(queue.length === 0) {
    return (<h3>No queue...</h3>)
  }

  return (
    <div className="box">
      <Card card={currentCard} reverse={reverse}/>
      <Quiz card={currentCard} allCards={randomCards} onAnswer={handleAnswer} answered={answered} quizType={quizType}/>
      <div className="result-container">
        {answered && <Result card={currentCard} onNext={handleNext} isCorrect={answered === "correct"}/>}
      </div>
      <div className="box-visuals">
        <Queue queue={queue}/>
        <Slots cards={cards} intervals={bucketSettings.map((s) => s["interval"])}/>
      </div>
    </div>
  )
}
