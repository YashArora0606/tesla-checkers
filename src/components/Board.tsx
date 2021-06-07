import React, { useEffect, useState } from "react";
import "./Board.scss";
import { PieceType } from "./Piece";
import Square, { SquareType } from "./Square";

const Board = () => {
	const BOARD_SIZE = 8;
	const [board, setBoard] = useState<number[][]>([[]]);

	// eslint-disable-next-line
	useEffect(() => {
		const initialBoard = initializeBoard();
		setBoard(initialBoard);
	}, []);

	const initializeBoard = () => {
		var arr = new Array(BOARD_SIZE).fill(PieceType.Empty).map(() => {
			return new Array(BOARD_SIZE).fill(PieceType.Empty);
		});
		arr.forEach((row, i) => {
			row.forEach((square, j) => {
				(i + j) % 2 !== 0 && i <= 2 && (arr[i][j] = PieceType.Blue);
				(i + j) % 2 !== 0 && i >= 5 && (arr[i][j] = PieceType.Red);
			});
		});
		return arr;
	};

	// const setBoardValue = (i: number, j: number, value: PieceType) => {
	// 	setBoard((board) => {
	// 		const newBoard = board.map((row) => {
	// 			return [...row];
	// 		});
	// 		newBoard[i][j] = value;
	// 		return newBoard;
	// 	});
	// };

	return (
		<div>
			<table className="game-board">
				<tbody>
					{board.map((row, i) => {
						return (
							<tr key={i}>
								{row.map((item, j) => {
									return (
										<Square
											id={`${i}-${j}`}
											key={j}
											squareType={
												(i + j) % 2 !== 0
													? SquareType.Dark
													: SquareType.Light
											}
											pieceType={item}
										/>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Board;
