import { useState, useEffect, useCallback } from "react"
import { APIgetMasteries, APIupdateMastery } from "../../api/API";
import './Mastery.css'
import { MasteryButton } from "./MasteryButton";
import { colors } from "../../colors"
import { Nav } from "../common/Nav";
import { AudioPlayer } from "../common/AudioPlayer";
import { GoGear } from "react-icons/go";

export function Mastery() {
  const [masteries, setMasteries] = useState([]);
  const [answerVisible, setAnswerVisible] = useState(false)

  useEffect(() => {
    APIgetMasteries().then(({masteries}) => {
      let shuffled = masteries
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      setMasteries(shuffled);
    });
  }, [])

  const handleNext = useCallback((difficulty) => {
    APIupdateMastery(masteries[0].id, difficulty).then((re) => {
      console.log(re.mastery.next_test)
      setMasteries((prevState) => prevState.slice(1))
      setAnswerVisible(false)
    });
  }, [masteries])

  const handleUserKeyPress = useCallback(event => {
    const { key } = event;

    if (!answerVisible) {
      if (key === "Enter") {
        setAnswerVisible(true)
      }
    } else {
      if(["1","2","3","4","5"].includes(key)) {
        handleNext(parseInt(key))
      }
    }

  }, [answerVisible, handleNext]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
    };
}, [handleUserKeyPress]);

  const showAnswer = () => {
    setAnswerVisible(true)
  }



  return (
    <div className="mastery">
     <Nav header="Mastery" link="mastery/manage" icon={<GoGear/>}/>
      {masteries.length > 0 && <>
        <p className="mastery-prompt">{masteries[0].to}</p>
        {!answerVisible &&
        <>
        <div className="reveal-button" onClick={showAnswer}>Show Answer</div>
        <AudioPlayer url={masteries[0].audio} playOnStart={true} display={false}/>
        </>}
      </>}

      {answerVisible && <>
        <p className="mastery-answer">{masteries[0]?.from}</p>
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
