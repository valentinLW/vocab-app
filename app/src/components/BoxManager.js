import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";
import { SlotForm } from "./SlotForm";
import { GoArrowBoth } from "react-icons/go";
import { colors } from "../colors"
import { NewCardForm } from "./NewCardForm";

export function BoxManager() {
  let {id} = useParams()
  id = parseInt(id)
  const [box, setBox] = useState(null)

  useEffect(() => {
    APIgetBox(id).then((res) => {
      setBox(res);
    });
  }, [id])

  if(box === null) {
    return(<h1>Loading...</h1>)
  }

  return(
    <div>
      <h1>{box.box.name}</h1>
      <h3>language: {box.box.language}</h3>
      <div className="slot-list">
        <h3>Slots:</h3>
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
      <NewCardForm/>
      <h3>Cards:</h3>
      <div className="cards-list">
        {box.cards.map((card) => {
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
