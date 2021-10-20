import { useState, useEffect } from "react"
import { APIgetBox, APIupdateCard } from "../api/API";
import { Card } from "./Card";
import { Queue } from "./Queue";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";
import '../css/Box.css'
import { Result } from "./Result";
import { GoGear, GoListUnordered } from "react-icons/go";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function Box() {
  let {id} = useParams()
  id = parseInt(id)
  const [cards, setCards] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [randomCards, setRandomCards] = useState([]);
  const [slots, setSlots] = useState([]);

  const queue = cards.filter((c) => {
    return Date.parse(c.next_test) <= Date.now()}
  ).sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)

  const currentCard = queue[0]
  const quizType = currentCard?.level ? slots[currentCard?.level-1]?.quiztype : null
  const reverse = quizType ? quizType.includes("reverse") : ""

  useEffect(() => {
    APIgetBox(id).then(({cards, slots}) => {
      setCards(cards);
      setSlots(slots);
    });
  }, [id]);

  const handleAnswer = (correct) => {
    APIupdateCard(currentCard.id, correct);
    setAnswered(correct ? "correct" : "incorrect");
  }

  const handleNext = (correct) => {
    setCards((prevState) => {
      return prevState.map((prevCard) => {
        if (prevCard.id === currentCard.id) {
          const newLevel = correct ? (currentCard.level === 5 ? 5 : currentCard.level + 1 ) : 1
          const interval = slots[newLevel-1].interval
          const nextTest = new Date(Date.now() + interval*60000).toString()
          return {...currentCard, updated_at: new Date(Date.now()).toString(), next_test: nextTest, level: newLevel}
        } else {
          return prevCard
        }
      })
    })
    setAnswered(false);
  }

  useEffect(() => {
    if(!currentCard) return
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

  return (
    <div className="box">
      <div className="box-links">
        <Link to={`/boxes/`} className="box-home-link">
          <GoListUnordered size="2rem" />
        </Link>
        <Link to={`/boxes/${id}/manage`} className="box-manage-link">
          <GoGear size="2rem" />
        </Link>
      </div>
      <div className="box-game">
        {currentCard && <Card card={currentCard} reverse={reverse}/>}
        {currentCard && <Quiz card={currentCard} allCards={randomCards} onAnswer={handleAnswer} answered={answered}/>}
        {!currentCard && <h1 style={{paddingTop: "10rem"}}>No queue, come back later</h1>}
        <div className="result-container">
          {( currentCard && answered) && <Result card={currentCard} onNext={handleNext} isCorrect={answered === "correct"} reverse={reverse}/>}
        </div>
      </div>
      <div className="box-visuals">
        <Queue queue={queue}/>
        <Slots cards={cards} intervals={slots.map((s) => s.interval)} quiztypes={slots.map((s) => s.quiztype)}/>
      </div>
    </div>
  )
}
