import { Move } from "../utils/gameLogic";
import Piece from "./Piece";
import Square from "./Square";
import "./Board.scss";

type BoardProps = {
	arr: number[][];
	onDragOver: (e: any) => void;
	onDrop: (e: any) => void;
	onDragStart: (e: any) => void;
	onMouseEnterPiece: (e: any) => void;
	onMouseLeavePiece: (e: any) => void;
	possibleMoves: Move[];
};

const Board = ({
	arr,
	onDragOver,
	onDrop,
	onDragStart,
	onMouseEnterPiece,
	onMouseLeavePiece,
	possibleMoves,
}: BoardProps) => {
	return (
		<div className="game-board" id="board">
			{arr.map((row, i) => {
				return (
					<div key={i} className="board-row">
						{row.map((item, j) => {
							return (
								<Square
									x={i}
									y={j}
									key={j}
									id={`sq-${i}-${j}`}
									onDragOver={onDragOver}
									onDrop={onDrop}
									highlight={possibleMoves.some((move) => {
										return (
											move.end.x === i && move.end.y === j
										);
									})}
								>
									<Piece
										pieceType={item}
										id={`pc-${i}-${j}`}
										onDragStart={onDragStart}
										onMouseEnter={onMouseEnterPiece}
										onMouseLeave={onMouseLeavePiece}
									/>
								</Square>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Board;
