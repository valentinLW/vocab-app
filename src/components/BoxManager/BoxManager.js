import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIdeleteCard, APIgetBox, APIresetBox } from "../../api/API";
import { GoArrowBoth, GoLinkExternal, GoZap, GoListUnordered } from "react-icons/go";
import { colors } from "../../colors"
import { NewCardForm } from "./NewCardForm";
import './BoxManager.css'
import { Nav } from "../common/Nav";

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

  const handleResetBox = () => {
    const r = window.confirm("Set all cards to level 1?")
    if (r) {
      APIresetBox(id);
    }
  }

  const handleDeleteCard = (card) => {
    const r = window.confirm(`Do you want to delete ${card.from}`);
    if (r) {
      APIdeleteCard(card.id).then((res) => {
        setCards((prevState) => prevState.filter((c) => c.id !== card.id))
      })
    }
  }

  if(box === null) {
    return(<h1>Loading...</h1>)
  }

  return(
    <div className="box-manager">
      <Nav leftLink={"/"} leftIcon={<GoListUnordered/>} header={box.box.name} rightLink={`/boxes/${id}`} rightIcon={<GoLinkExternal/>}/>

      <h3>Add card:</h3>
      <NewCardForm boxId={id} onNewCard={handleNewCard}/>
      <div className="card-list-header">
        <h3>Cards:</h3>
        <GoZap size="1.25rem" onClick={() => handleResetBox()} className="reset-box-button" />
      </div>
      <div className="cards-list">
        {cards.map((card) => {
          return (
            <div
              key={`card-${card.id}`}
              className="card-list-card"
              style={{backgroundColor: colors[card.color]}}
              onClick={() => handleDeleteCard(card)}>
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
