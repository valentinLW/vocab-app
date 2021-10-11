import { useParams } from "react-router-dom";

export function BoxManager(params) {
  const { id } = useParams();
  return(
    <div className="">box id {id}</div>
  )
}
