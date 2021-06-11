import React, { useEffect, useState } from "react";
import { getValidSquares, Move } from "../utils/gameLogic";
import "./Board.scss";
import Piece, { PieceType } from "./Piece";
import Square from "./Square";

const Board = () => {
	const BOARD_SIZE = 8;
	const [board, setBoard] = useState<number[][]>([[]]);
	const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);

	useEffect(() => {
		const initialBoard = initializeBoard();
		setBoard(initialBoard);
	}, []);

	const initializeBoard = () => {
		var arr = new Array(BOARD_SIZE).fill(PieceType.Empty).map(() => {
			return new Array(BOARD_SIZE).fill(PieceType.Empty);
		});
		// arr.forEach((row, i) => {
		// 	row.forEach((square, j) => {
		// 		(i + j) % 2 !== 0 && i <= 2 && (arr[i][j] = PieceType.Blue);
		// 		(i + j) % 2 !== 0 && i >= 5 && (arr[i][j] = PieceType.Red);
		// 	});
		// });
		arr[0][5] = PieceType.Blue;
		arr[5][4] = PieceType.Red;

		return arr;
	};

	const makeEnemyMove = () => {
		board.forEach((row, i) => {
			row.forEach((item, j) => {
				const moves = getValidSquares(board, i, j);
				if (item === PieceType.Blue && moves.length > 0) {
					makeMove(moves[0]);
					return;
				}
			});
		});
	};

	const onDrop = (event: any) => {
		const id = event.dataTransfer.getData("text");
		const draggableElement = document.getElementById(id);
		const dropzone = event.target;

		const dropzoneIsDroppable =
			dropzone.className.includes("square") &&
			dropzone.childElementCount === 0 &&
			draggableElement !== null;

		const endX = dropzone.dataset.x;
		const endY = dropzone.dataset.y;

		const moveBeingMade = possibleMoves.find((move) => {
			return (
				move.end.x.toString() === endX && move.end.y.toString() === endY
			);
		});

		if (
			dropzoneIsDroppable &&
			moveBeingMade !== undefined &&
			draggableElement &&
			draggableElement.parentElement
		) {
			makeMove(moveBeingMade);
			setTimeout(() => {
				makeEnemyMove();
			}, 1500);
			setPossibleMoves([]);
		}

		event.dataTransfer.clearData();
	};
	const makeMove = (moveBeingMade: Move) => {
		const start = moveBeingMade.start;
		const end = moveBeingMade.end;
		const cap = moveBeingMade.captured;
		const initialValue = board[start.x][start.y];

		setBoard((board) => {
			return board.map((row, i) => {
				return row.map((item, j) => {
					if (i === start.x && j === start.y) {
						return 0;
					} else if (i === end.x && j === end.y) {
						return initialValue;
					} else if (cap && i === cap.x && j === cap.y) {
						return 0;
					}
					return item;
				});
			});
		});
	};
	const onDragOver = (event: any) => {
		event.preventDefault();
	};
	const onDragStart = (event: any) => {
		event.dataTransfer.setData("text/plain", event.target.id);
	};
	const onMouseEnterPiece = (event: any) => {
		const x = event.target.parentElement.dataset.x;
		const y = event.target.parentElement.dataset.y;
		const validSquares = getValidSquares(
			board,
			parseFloat(x),
			parseFloat(y)
		);
		setPossibleMoves(validSquares);
	};
	const onMouseLeavePiece = (event: any) => {
		setPossibleMoves([]);
	};

	return (
		<div className="game-board" id="board">
			{board.map((row, i) => {
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
