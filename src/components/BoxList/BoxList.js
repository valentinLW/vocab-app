import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIdeleteBox, APIgetBoxes, APImasterBox } from "../../api/API";
import { NewBoxForm } from "./NewBoxForm";
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

  const handleDeleteBox = (id) => {
    APIdeleteBox(id);
    setBoxes((prevState) => prevState.filter((box) => box.id !== id));
  }

  const confirmDelete = (id) => {
    const r = window.confirm("Are you sure?");
    if (r) {
      handleDeleteBox(id)
    }
  }

    const confirmMastery = (id) => {
    const r = window.confirm("Retire all cards to mastery?");
    if (r) {
      APImasterBox(id)
      setBoxes((prevState) => prevState.filter((box) => box.id !== id));
      setMasteryCount("*")
    }
  }

  return (
    <div className="boxes-list">
       <h4>Add box</h4>
      <NewBoxForm/>
      <h4>Mastery</h4>
      <Link to="mastery" className="boxes-list-box-link">
        Pending
        <p className="boxes-list-count">{masteryCount}</p>
      </Link>
      <h4>Your boxes</h4>
      {boxes.map((box) => {
        return(
          <div key={`box-${box.id}`} className="box-list-box">
            <Link to={`/boxes/${box.id}`} className="boxes-list-box-link">
              {box.name}
              {box.count > 0 && <p className="boxes-list-count">{box.count}</p>}
              </Link>
            <Link to={`/boxes/${box.id}/manage`} className="boxes-list-manage-link"><GoGear/></Link>
            <GoTrashcan onClick={ ()=> confirmDelete(box.id)}/>
            <GoKey onClick={ ()=> confirmMastery(box.id)}/>
          </div>
        )
      })}
    </div>
  )
}
