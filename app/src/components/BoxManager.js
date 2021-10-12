import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBox } from "../api/API";
import { SlotForm } from "./SlotForm";

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
            <div className="slot-list-slot">
              <div>Level: {slot.order}</div>
              <SlotForm slot={slot} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
