export function Quiz({words, card, onAnswer}) {

  const randomIndex = Math.floor(Math.random() * 3);
  const allWords = [...words.slice(0, randomIndex), card.to, ...words.slice(randomIndex)];

  return (
    <div className="quiz">
      {allWords.map((word) => {
        return (
          <div key ={`answer-${word}`} onClick={() => onAnswer(card, word === card.to)}>
            {word}
          </div>)
      })}
    </div>
  )
}
