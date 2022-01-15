import { useState, useEffect } from "react"
import { GoLinkExternal } from "react-icons/go";
// import { colors } from "../../colors"
import './MasteryManager.css'
import { Nav } from "../common/Nav";
import { APIindexMastery } from "../../api/API";

export function MasteryManager() {
  // const [allMasteries, setMasteries] = useState([])
  const [masteriesDist, setMasteriesDist] = useState(null)

  useEffect(() => {
    APIindexMastery().then((res) => {
      const { masteries_dist } = res
      // setMasteries(masteries);
      setMasteriesDist(masteries_dist);
    });
  }, []);


  return(
    <div className="mastery-manager">
      <Nav link={"/mastery"} icon={<GoLinkExternal/>} header="Mastery Settings"/>
      <div>
        {masteriesDist !== null &&
          Object.keys(masteriesDist).sort().map((k, v) => {
            return (
              <p key={k}>{k} - {v}</p>
            )
          })
        }
      </div>
    </div>
  )
}
