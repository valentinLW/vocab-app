import { useState, useEffect, useCallback } from "react"
import { APIgetMasteries, APIupdateMastery } from "../../api/API";
import './Mastery.css'
import { MasteryButton } from "./MasteryButton";
import { Card } from "../common/Card";
import { colors } from "../../colors"
import { Nav } from "../common/Nav";
import { AudioPlayer } from "../common/AudioPlayer";
import { GoGear, GoListUnordered } from "react-icons/go";

export function Mastery() {
  const [masteries, setMasteries] = useState([]);
  const [answerVisible, setAnswerVisible] = useState(false)
  const [reverse, setReverse] = useState(Math.random() < 0.5);

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
     <Nav leftLink="/" leftIcon={<GoListUnordered/>} header="mastery" rightLink="mastery/manage" rightIcon={<GoGear/>}/>
      {masteries.length > 0 && <>
        <Card card={masteries[0]} reverse={reverse} answered={answerVisible}/>
        {!answerVisible &&
        <>
        <div className="reveal-button" onClick={showAnswer}>Show Answer</div>
        </>}
      </>}

      {answerVisible && <>
        <AudioPlayer url={masteries[0].audio} playOnStart={true} display={false}/>
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
