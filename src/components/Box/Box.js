import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Card } from "./Card";
import { CardStack } from "./CardStack";
import { Quiz } from "./Quiz";
import { Slots } from "./Slots";
import { Result } from "./Result";
import { APIgetBox, APIupdateCard } from "../../api/API";
import { GoGear, GoListUnordered } from "react-icons/go";
import './Box.css'

export function Box() {
  let {id} = useParams()
  id = parseInt(id)
  const [cards, setCards] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    APIgetBox(id).then(({cards, slots}) => {
      setCards(cards);
      setSlots(slots);
    });
  }, [id]);

  const queue = cards.filter((c) => {
    return Date.parse(c.next_test) <= Date.now()}
  ).sort((a, b) => (Date.parse(a.updated_at) > Date.parse(b.updated_at)) ? 1 : -1)

  const currentCard = queue[0]
  const reverse = slots[currentCard?.level-1]?.quiztype.includes("reverse")
  console.log({reverse})

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

  if (cards.length === 0) {
    return (<h3>There are no cards in this box...</h3>)
  }

  return (
    <div className="box">
      <div className="box-links">
        <Link to={`/boxes`} className="box-home-link">
          <GoListUnordered size="2rem" />
        </Link>
        <Link to={`/boxes/${id}/manage`} className="box-manage-link">
          <GoGear size="2rem" />
        </Link>
      </div>
      <div className="box-game">
        {currentCard && <Card card={currentCard} reverse={reverse}/>}
        {currentCard && <Quiz card={currentCard} onAnswer={handleAnswer} answered={answered} reverse={reverse}/>}
        {!currentCard && <h1 style={{paddingTop: "10rem"}}>No queue, come back later</h1>}
        <div className="result-container">
          {( currentCard && answered) && <Result card={currentCard} onNext={handleNext} isCorrect={answered === "correct"} reverse={reverse}/>}
        </div>
      </div>
      <div className="box-visuals">
        <div className="queue">
          <h3>Queue: {queue.length}</h3>
          <CardStack cards={queue} isQueue={true}/>
        </div>
        <Slots cards={cards} intervals={slots.map((s) => s.interval)} quiztypes={slots.map((s) => s.quiztype)}/>
      </div>
    </div>
  )
}
