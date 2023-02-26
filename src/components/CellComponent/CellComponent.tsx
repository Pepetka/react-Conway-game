import {memo} from "react";
import {Cell} from "../../models/Cell";

interface ICellComponentProps {
	cell: Cell;
	onClick: (cell: Cell) => void;
}

export const CellComponent = memo((props: ICellComponentProps) => {
  const {cell, onClick} = props;

  const onClickHandle = () => onClick(cell);

  return (
    <div onClick={onClickHandle} className={`Cell ${cell.isAlive ? "alive" : "dead"}`} />
  );
});
