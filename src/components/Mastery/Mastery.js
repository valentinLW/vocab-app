import { useState, useEffect } from "react"
import { APIgetMasteries, APIupdateMastery } from "../../api/API";
import './Mastery.css'
import { MasteryButton } from "./MasteryButton";
import { colors } from "../../colors"

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
        <p className="mastery-prompt">{masteries[0].from}</p>
        {!answerVisible && <div className="reveal-button" onClick={showAnswer}>Show Answer</div>}
      </>}

      {answerVisible && <>
        <p className="mastery-answer">{masteries[0].to}</p>
        <div className="mastery-buttons">
          <MasteryButton text={"perfect"} color={colors.green} onClick={() => handleNext(5)}/>
          <MasteryButton text={"easy"} color={colors.green} onClick={() => handleNext(4)}/>
          <MasteryButton text={"difficult"} color={colors.red} onClick={() => handleNext(3)}/>
          <MasteryButton text={"incorrect"} color={colors.red} onClick={() => handleNext(2)}/>
          <MasteryButton text={"mistaken"} color={colors.red} onClick={() => handleNext(1)}/>
          <MasteryButton text={"blackout"} color="black" onClick={() => handleNext(0)}/>
        </div>
      </>}
      {masteries.length === 0 && <>
        <p>No Masteries now, come back later</p>
      </>}
    </div>
  )
}
