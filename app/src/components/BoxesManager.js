import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBoxes } from "../api/API";
import { NewBoxForm } from "./NewBoxForm";

export function BoxesManager() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    APIgetBoxes().then(({boxes}) => {
      setBoxes(boxes);
    });
  }, [])
  return (
    <div>
      <NewBoxForm/>
      {boxes.map((box) => {
        return(
          <Link to={`/boxes/${box.id}`}><div>{box.name}</div></Link>
        )
      })}
    </div>
  )
}
