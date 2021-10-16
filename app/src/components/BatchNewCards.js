import { APInewCardBatch } from "../api/API";

export function BatchNewCards({boxId, onNewCards}) {

  const onChangeHandler = ({target}) => {
    const fileReader = new FileReader();
    fileReader.readAsText(target.files[0], "UTF-8");
    fileReader.onload = e => {
      const csv = e.target.result
      APInewCardBatch(boxId, csv).then(({cards}) => {
        if (cards.length > 0) {
          onNewCards(cards);
        }
      })
    };
  }

  return (
    <form>
      <input type="file" name="file" onChange={onChangeHandler}/>
    </form>
  )
}
