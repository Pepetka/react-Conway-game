import {Fragment, memo, useCallback} from "react";
import {Board} from "../../models/Board";
import {CellComponent} from "../CellComponent/CellComponent";
import {Cell} from "../../models/Cell";

interface IBoardComponentProps {
	board: Board;
	setBoard: (board: Board) => void;
}

export const BoardComponent = memo((props: IBoardComponentProps) => {
	const {board, setBoard} = props;

	const onUpdateBoard = useCallback(() => {
		setBoard(board.getCopyBoard());
	}, [board, setBoard]);

	const onCellClick = useCallback((cell: Cell) => {
		cell.setAlive(!cell.isAlive);
		onUpdateBoard();
	}, [onUpdateBoard]);

	return (
		<div style={{width: `${board.boardWidth * 10}px`}} className="Board">
			{board.cells.map((row, index) => (
				<Fragment key={index}>
					{row.map((cell) => (
						<CellComponent
							key={cell.id}
							cell={cell}
							onClick={onCellClick}
						/>
					))}
				</Fragment>
			))}
		</div>
	);
});
