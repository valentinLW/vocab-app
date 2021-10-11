import '../css/BoxSelector.css'

export function BoxSelector({boxes, selectedBox=null, onSelectBox}) {
  return (
    <div className="boxes">
      {boxes.map((box, i) => {
        return (
          <div key={`box-${i}-${box.name}`} className="" onClick={()=> onSelectBox(box)}>
            <p className={`box-name${selectedBox?.id === box.id ? " box-selected" : ""}`}>{box.name}</p>
          </div>
        )
      })}
    </div>
  )
}
