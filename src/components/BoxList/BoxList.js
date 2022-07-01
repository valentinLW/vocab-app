import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIgetBoxes } from "../../api/API";
import { NewBoxForm } from "./NewBoxForm";
import { BoxListItem } from "./BoxListItem";
import { GoGear, GoKey, GoTrashcan } from "react-icons/go";
import './BoxList.css'

export function BoxList() {
  const [boxes, setBoxes] = useState([]);
  const [masteryCount, setMasteryCount] = useState("*");

  useEffect(() => {
    APIgetBoxes().then(({boxes, masteryCount}) => {
      setBoxes(boxes);
      setMasteryCount(masteryCount);
    });
  }, [])

  return (
    <div className="boxes-list">
      <BoxListItem name="new box" linkto={""}/>
      <BoxListItem name="mastery" count={masteryCount} linkto={"mastery"}/>
      {boxes.map((box) => {
        return(
          <BoxListItem name={box.name} count={box.count} linkto={`/boxes/${box.id}`}/>
        )
      })}
    </div>
  )
}
