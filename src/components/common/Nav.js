import { Link } from "react-router-dom";
import { GoListUnordered } from "react-icons/go";
import './Nav.css'

export function Nav({link, icon, header}) {

  return(
      <div className="nav">
        <Link to={"/"} className="nav-link">
          <GoListUnordered/>
        </Link>
        <h1>{header}</h1>
        <Link to={link || ""} className="nav-link" style={{visibility: link ? "visible" : "hidden"}}>
          {icon || <GoListUnordered/>}
        </Link>
      </div>
  )
}
