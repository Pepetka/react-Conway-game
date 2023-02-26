import {useCallback, useEffect, useRef, useState} from "react"
import "./App.css"
import {Board} from "./models/Board";
import {BoardComponent} from "./components/BoardComponents/BoardComponent";

function App() {
  const [board, setBoard] = useState<Board>(new Board());
  const [start, setStart] = useState(false);
  const [gen, setGen] = useState(1);
  const [duration, setDuration] = useState(500);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onNextGen = useCallback(() => {
    const newBoard = board.getNextGeneration();
    setBoard(newBoard);
  }, [board]);

  const onStart = (intervalDuration: number = duration) => {
    setStart(true);

    intervalRef.current = setInterval(() => {
      onNextGen();
      setGen((prev) => prev + 1);
    }, intervalDuration);
  }

  const onPause = useCallback(() => {
    setStart(false);
    clearInterval(intervalRef.current!)
  }, [])

  const onRestart = useCallback(() => {
    onPause();
    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);
    setGen(1);
  }, [onPause])

  useEffect(() => {
    if (board.staticNextGen) {
      onPause();
    }
  }, [board.staticNextGen, onPause])

  useEffect(() => {
    onRestart();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [onRestart])

  const onFaster = () => {
    onPause();
    onStart(duration === 250 ? 500 : 250);
    setDuration((prev) => prev === 250 ? 500 : 250);
  }

  const onSlower = () => {
    onPause();
    onStart(duration === 750 ? 500 : 750);
    setDuration((prev) => prev === 750 ? 500 : 750);
  }

  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard} />
      <div className="btnGroup">
        <button className="button" onClick={onNextGen}>Next Generation</button>
        <div>
          <button className="button" onClick={onFaster}>Faster</button>
          {start ? (
            <button className="button" onClick={onPause}>Pause</button>
          ) : (
            <button className="button" onClick={() => onStart()}>Start</button>
          )}
          <button className="button" onClick={onSlower}>Slower</button>
        </div>
        <button className="button" onClick={onRestart}>Restart</button>
      </div>
    </div>
  )
}

export default App
