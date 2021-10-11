import { useState, useEffect } from "react"
import { APIgetBoxes } from "./api/API";
import { BoxSelector } from "./components/BoxSelector";
import { Box } from './components/Box';
import './App.css';

function App() {
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
    <div className="App">
      <BoxSelector boxes={boxes} selectedBox={selectedBox} onSelectBox={handleSelectBox}/>
      {selectedBox && <Box id={selectedBox.id}/>}
    </div>
  );
}

export default App;
