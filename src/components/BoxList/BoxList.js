import { useState, useEffect } from "react"
import { APIgetBoxes } from "../../api/API";
import { BoxListItem } from "./BoxListItem";
import { GoListUnordered, GoSignOut } from "react-icons/go";
import './BoxList.css'
import { Nav } from "../common/Nav";

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
    <div>
      <Nav leftLink={"/"} leftIcon={<GoListUnordered/>} header={"vocab"} rightLink={"/signout"} rightIcon={<GoSignOut/>}/>
        <div className="boxes-list">
          <BoxListItem name="new box" linkto={"new"}/>
          <BoxListItem name="mastery" count={masteryCount} linkto={"mastery"}/>
          {boxes.map((box) => {
            return(
              <BoxListItem name={box.name} count={box.count} linkto={`/boxes/${box.id}`}/>
            )
          })}
      </div>
    </div>
  )
}
