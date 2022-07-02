import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIdeleteCard, APIgetBox, APIresetBox, APImasterBox, APIdeleteBox } from "../../api/API";
import { GoArrowBoth, GoLinkExternal, GoZap, GoListUnordered, GoKey, GoTrashcan } from "react-icons/go";
import { colors } from "../../colors"
import { NewCardForm } from "./NewCardForm";
import './BoxManager.css'
import { Nav } from "../common/Nav";

export function BoxManager() {
  const history = useHistory()
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

  const handleMastery = () => {
    const r = window.confirm("Retire all cards to mastery?");
    if (r) {
      APImasterBox(id);
      history.push("/boxes")
    }
  }

  const handleDeleteBox = () => {
    const r = window.confirm("Are you sure?");
    if (r) {
      APIdeleteBox(id);
      history.push("/boxes")
    }
  }

  if(box === null) {
    return (<h3>BOXNULL</h3>)
  }

  return(
    <div className="box-manager">
      <Nav leftLink={"/"} leftIcon={<GoListUnordered/>} header={box.box.name} rightLink={`/boxes/${id}`} rightIcon={<GoLinkExternal/>}/>

      <h3>Add card:</h3>
      <NewCardForm boxId={id} onNewCard={handleNewCard}/>
      <div className="card-list-header">
        <h3>Reset cards:</h3>
        <GoZap size="1.25rem" onClick={() => handleResetBox()} className="reset-box-button" />
      </div>
      <div className="card-list-header">
        <h3>Retire cards to mastery:</h3>
        <GoKey size="1.25rem" onClick={() => handleMastery()} className="reset-box-button" />
      </div>
      <div className="card-list-header">
        <h3>Delete box and cards:</h3>
        <GoTrashcan size="1.25rem" onClick={() => handleDeleteBox()} className="reset-box-button" />
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
