import {useCallback, useEffect, useRef, useState} from "react"
import "./App.css"
import {Board} from "./models/Board";
import {BoardComponent} from "./components/BoardComponents/BoardComponent";

function App() {
	const [board, setBoard] = useState<Board>(new Board());
	const [start, setStart] = useState(false);
	const [_, setGen] = useState(1);
	const [duration, setDuration] = useState(500);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const onNextGen = useCallback(() => {
		board.setNextGeneration();
		const newBoard = board.getCopyBoard();
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
		const newBoard = new Board(100, 60);
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
		onStart(duration === 50 ? 500 : 50);
		setDuration((prev) => prev === 50 ? 500 : 50);
	}

	const onSlower = () => {
		onPause();
		onStart(duration === 1000 ? 500 : 1000);
		setDuration((prev) => prev === 1000 ? 500 : 1000);
	}

	const onRandom = () => {
		board.setRandomFirstGen();
		const newBoard = board.getCopyBoard();

		setBoard(newBoard);
	}

	return (
		<div className="App">
			<BoardComponent board={board} setBoard={setBoard} />
			<div className="btnGroup">
				<div className="controlGroup">
					<button className="button" onClick={onNextGen}>Next</button>
					<button className="button" onClick={onRandom}>Random</button>
				</div>
				<div className="controlGroup">
					<button className={`button ${duration === 1000 ? "active" : ""}`} onClick={onSlower}>Slower</button>
					{start ? (
						<button className="button active" style={{width: "100px"}} onClick={onPause}>Pause</button>
					) : (
						<button className="button" style={{width: "100px"}} onClick={() => onStart()}>Start</button>
					)}
					<button className={`button ${duration === 50 ? "active" : ""}`} onClick={onFaster}>Faster</button>
				</div>
				<button className="button" onClick={onRestart}>Clear</button>
			</div>
		</div>
	)
}

export default App
