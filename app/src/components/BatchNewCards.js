export function BatchNewCards(params) {

  const onChangeHandler = ({target}) => {
    const fileReader = new FileReader();
    fileReader.readAsText(target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log(JSON.parse(e.target.result));
    };
  }

  return (
    <form>
      <input type="file" name="file" onChange={onChangeHandler}/>
    </form>
  )
}
