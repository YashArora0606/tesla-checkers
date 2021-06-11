import React, { useEffect, useState } from "react";
import { getValidSquares } from "../utils/gameLogic";
import "./Board.scss";
import Piece, { PieceType } from "./Piece";
import Square from "./Square";

const Board = () => {
	const BOARD_SIZE = 8;
	const [board, setBoard] = useState<number[][]>([[]]);
	const [highlightedSquares, setHighlightedSquares] = useState<Set<string>>(
		new Set<string>()
	);

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

	const onDrop = (event: any) => {
		const id = event.dataTransfer.getData("text");
		const draggableElement = document.getElementById(id);
		const dropzone = event.target;

		const dropzoneIsDroppable =
			dropzone.className.includes("square") &&
			dropzone.childElementCount === 0 &&
			draggableElement !== null;

		const x1 = draggableElement!.parentElement!.dataset.x;
		const y1 = draggableElement!.parentElement!.dataset.y;
		const x2 = dropzone.dataset.x;
		const y2 = dropzone.dataset.y;

		const isMoveValid = highlightedSquares.has(`${x2}-${y2}`);

		if (dropzoneIsDroppable && isMoveValid) {
			setBoard((board) => {
				return board.map((row, i) => {
					return row.map((item, j) => {
						if (i.toString() === x1 && j.toString() === y1) {
							return 0;
						} else if (i.toString() === x2 && j.toString() === y2) {
							return 1;
						}
						return item;
					});
				});
			});
		}

		event.dataTransfer.clearData();
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
		setHighlightedSquares(validSquares);
	};
	const onMouseLeavePiece = (event: any) => {
		setHighlightedSquares(new Set());
	};

	return (
		<div>
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
										highlight={highlightedSquares.has(
											`${i}-${j}`
										)}
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
		</div>
	);
};

export default Board;
