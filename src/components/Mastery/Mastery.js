import { useState, useEffect } from "react"
import { APIgetMasteries, APIupdateMastery } from "../../api/API";
import './Mastery.css'
import { MasteryButton } from "./MasteryButton";

export function Mastery() {
  const [masteries, setMasteries] = useState([]);
  const [answerVisible, setAnswerVisible] = useState(false)

  useEffect(() => {
    APIgetMasteries().then(({masteries}) => {
      setMasteries(masteries);
    });
  }, [])

  const showAnswer = () => {
    setAnswerVisible(true)
  }

  const handleNext = (difficulty) => {
    APIupdateMastery(masteries[0].id, difficulty).then((re) => {
      console.log(re.mastery.next_test)
      setAnswerVisible(false)
      setMasteries((prevState) => prevState.slice(1))
    });
  }


  return (
    <div className="mastery">
      {masteries.length > 0 && <>
        <p>{masteries[0].from}</p>
        {!answerVisible && <div onClick={showAnswer}>Show Answer</div>}
      </>}

      {answerVisible && <>
        <p>{masteries[0].to}</p>
        <MasteryButton text={"perfect"} onClick={() => handleNext(5)}/>
        <MasteryButton text={"easy"} onClick={() => handleNext(4)}/>
        <MasteryButton text={"difficult"} onClick={() => handleNext(3)}/>
        <MasteryButton text={"incorrect"} onClick={() => handleNext(2)}/>
        <MasteryButton text={"mistaken"} onClick={() => handleNext(1)}/>
        <MasteryButton text={"blackout"} onClick={() => handleNext(0)}/>
      </>}
      {masteries.length === 0 && <>
        <p>No Masteries now, come back later</p>
      </>}
    </div>
  )
}
