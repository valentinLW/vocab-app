import { useState, useEffect } from "react"
import { APIgetBoxes } from "../api/API";
import { BoxSelector } from "./BoxSelector";
import { Box } from './Box';
import '../css/Flashcards.css';

function Flashcards() {
  const [boxes, setBoxes] = useState([])
  const [selectedBox, setSelectedBox] = useState(false)

  useEffect(() => {
    APIgetBoxes().then(({boxes}) => {
      setBoxes(boxes);
      setSelectedBox(boxes[0]);
    });
  }, [])

  const handleSelectBox = (box) => {
    setSelectedBox(box);
  }

  return (
    <div className="flashcards">
      <BoxSelector boxes={boxes} selectedBox={selectedBox} onSelectBox={handleSelectBox}/>
      {selectedBox && <Box id={selectedBox.id}/>}
    </div>
  );
}

export default Flashcards;
