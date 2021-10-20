import './Queue.css'
import { CardStack } from "./CardStack"

export function Queue({queue}) {
  return (
    <div className="queue">
      <h3>Queue: {queue.length}</h3>
      <CardStack cards={queue} isQueue={true}/>
    </div>
  )
}
