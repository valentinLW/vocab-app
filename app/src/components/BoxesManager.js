import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBoxes } from "../api/API";
import { NewBoxForm } from "./NewBoxForm";
import { GoGear } from "react-icons/go";
import '../css/BoxesManager.css'

export function BoxesManager() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    APIgetBoxes().then(({boxes}) => {
      setBoxes(boxes);
    });
  }, [])
  return (
    <div className="boxes-list">
       <h4>Add box</h4>
      <NewBoxForm/>
      <h4>Your boxes</h4>
      {boxes.map((box) => {
        return(
          <div key={`box-${box.id}`} className="box-list-box">
            <Link to={`/boxes/${box.id}`}>{box.name}</Link>
            <Link to={`/boxes/${box.id}/manage`} className="box-manage-link"><GoGear/></Link>
          </div>
        )
      })}
    </div>
  )
}
