import { useState, useEffect } from "react"
import { APIgetBoxes } from "../api/API";
import { Box } from './Box';
import '../css/Flashcards.css';
import { useParams } from "react-router";

function Flashcards() {
  let {id} = useParams()
  id = parseInt(id)
  const [selectedBox, setSelectedBox] = useState(false)

  useEffect(() => {
    APIgetBoxes().then(({boxes}) => {
      setSelectedBox(boxes.find((box) => box.id === id));
    });
  }, [id])

  return (
    <div className="flashcards">
      {selectedBox && <Box id={selectedBox.id}/>}
    </div>
  );
}

export default Flashcards;
