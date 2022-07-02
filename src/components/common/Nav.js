import { Link } from "react-router-dom";
import './Nav.css'

export function Nav({leftLink, leftIcon, rightLink, rightIcon, header}) {

  return(
      <div className="nav">
        <Link to={leftLink || ""} className="nav-link-left" style={{visibility: leftLink ? "visible" : "hidden"}}>
          {leftIcon}
        </Link>
        <h1>{header}</h1>
        <Link to={rightLink || ""} className="nav-link-right" style={{visibility: rightLink ? "visible" : "hidden"}}>
          {rightIcon}
        </Link>
      </div>
  )
}
