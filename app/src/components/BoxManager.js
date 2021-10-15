import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";
import { SlotForm } from "./SlotForm";
import { GoArrowBoth } from "react-icons/go";
import { colors } from "../colors"
import { NewCardForm } from "./NewCardForm";
import { BatchNewCards } from "./BatchNewCards";
import '../css/BoxManager.css'

export function BoxManager() {
  let {id} = useParams()
  id = parseInt(id)
  const [box, setBox] = useState(null)
  const [cards, setCards] = useState([])

  useEffect(() => {
    APIgetBox(id).then((res) => {
      const { cards, ...box } = res
      setBox(box);
      setCards(cards);
    });
  }, [id]);

  const handleNewCard = (card) => {
    setCards((prevState) => [...prevState, card])
  }

  if(box === null) {
    return(<h1>Loading...</h1>)
  }

  return(
    <div>
      <h1>{box.box.name}</h1>
      <h3>language:</h3>
      <h4>{box.box.language}</h4>
      <h3>Slots:</h3>
      <div className="slot-list">
        {box.slots.map((slot) => {
          return (
            <div key={`slot-${slot.order}`} className="slot-list-slot">
              <div>Level: {slot.order}</div>
              <SlotForm slot={slot} />
            </div>
          )
        })}
      </div>
      <h3>Add Card:</h3>
      <NewCardForm boxId={id} onNewCard={handleNewCard}/>
      <BatchNewCards />
      <h3>Cards:</h3>
      <div className="cards-list">
        {cards.map((card) => {
          return (
            <div key={`card-${card.id}`} className="card-list-card" style={{backgroundColor: colors[card.color]}}>
              <p>{card.from}</p>
              <GoArrowBoth />
              <p>{card.to}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
