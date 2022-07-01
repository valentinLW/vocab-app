import { Link } from "react-router-dom";
export function BoxListItem({name, count, linkto}) {
  
    return (
        <Link to={linkto} className="box-list-item">
            <p className="box-list-item-count">{count}</p>
            <p>{name}</p>
        </Link>
    )
  }