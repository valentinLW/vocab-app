import { useState, useEffect } from "react"
import { useParams } from "react-router";
import { Card } from "./Card";
import { Quiz } from "./Quiz";
import { Result } from "./Result";
import { APIgetBox, APIupdateCard } from "../../api/API";
import { GoGear } from "react-icons/go";
import './Box.css'
import { Nav } from "../common/Nav";

export function Box() {
  let {id} = useParams()
  id = parseInt(id)
  const [cards, setCards] = useState([]);

  useEffect(() => {
    APIgetBox(id).then(({cards}) => {
      setCards(cards);
    });
  }, [id]);

  const queue = cards.filter((c) => {
    return Date.parse(c.next_test) <= Date.now()}
  ).sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)

  const currentCard = queue[0]
  const [reverse, setReverse] = useState(Math.random() < 0.5);
  const intervals = [0, 15, 60, 360, 1440]
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (correct) => {
    APIupdateCard(currentCard.id, correct);
    setAnswered(correct ? "correct" : "incorrect");
  }

  const handleNext = (correct) => {
    setCards((prevState) => {
      return prevState.map((prevCard) => {
        if (prevCard.id === currentCard.id) {
          const newLevel = correct ? (currentCard.level === 5 ? 5 : currentCard.level + 1 ) : 1
          const interval = intervals[newLevel-1]
          const nextTest = new Date(Date.now() + interval*60000).toString()
          return {...currentCard, updated_at: new Date(Date.now()).toString(), next_test: nextTest, level: newLevel}
        } else {
          return prevCard
        }
      })
    })
    setAnswered(false);
  }

  if (cards.length === 0) {
    return (<h3>There are no cards in this box...</h3>)
  }

  return (
    <div className="box">
    <Nav link={`/boxes/${id}/manage`} icon={<GoGear/>}/>
      <div className="box-game">
        {currentCard && <Card card={currentCard} reverse={reverse} answered={answered}/>}
        {(currentCard && !answered) && <Quiz card={currentCard} onAnswer={handleAnswer} answered={answered} reverse={reverse}/>}
        {!currentCard && <h1 style={{paddingTop: "10rem"}}>No queue, come back later</h1>}
        {( currentCard && answered) && <Result card={currentCard} onNext={handleNext} isCorrect={answered === "correct"} reverse={reverse}/>}
      </div>
    </div>
  )
}
