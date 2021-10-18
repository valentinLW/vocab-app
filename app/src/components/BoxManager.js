import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";
import { SlotForm } from "./SlotForm";
import { GoArrowBoth, GoLinkExternal } from "react-icons/go";
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

  const handleNewCards = (cards) => {
    setCards((prevState) => [...prevState, ...cards])
  }

  if(box === null) {
    return(<h1>Loading...</h1>)
  }

  return(
    <div className="box-manager">
      <div className="box-manager-game-link">
        <h1>{box.box.name}</h1>
        <Link to={`/boxes/${id}`}>
          <GoLinkExternal size={30}/>
        </Link>
      </div>
      <h3>Language: {box.box.language}</h3>
      <h3>Slots:</h3>
      <div className="slot-list">
        <div className="slot-list-label">
          <p className="slot-list-label-level">slot</p>
          <p className="slot-list-label-select">quiz type</p>
          <p className="slot-list-label-select">interval</p>
        </div>
        {box.slots.map((slot) => <SlotForm key={`slot-${slot.order}`} slot={slot} />)}
      </div>
      <h3>Add card:</h3>
      <NewCardForm boxId={id} onNewCard={handleNewCard}/>
      <h3>Add cards from csv:<span style={{color: "#777777", marginLeft: "0.5rem"}}>(delimiter ';' one card per line)</span></h3>
      <BatchNewCards boxId={id} onNewCards={handleNewCards}/>
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
