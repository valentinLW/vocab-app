import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { APIdeleteBox, APIgetBoxes } from "../../api/API";
import { NewBoxForm } from "./NewBoxForm";
import { GoGear, GoTrashcan } from "react-icons/go";
import './BoxList.css'

export function BoxList() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    APIgetBoxes().then(({boxes}) => {
      setBoxes(boxes);
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

  return (
    <div className="boxes-list">
       <h4>Add box</h4>
      <NewBoxForm/>
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
          </div>
        )
      })}
    </div>
  )
}
