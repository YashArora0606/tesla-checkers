import React, { useEffect, useState } from "react";
import {
	evaluateWinner,
	getAllMoves,
	getPiecesLeft,
	getValidMovesByPosition,
	getValidSquares,
	Move,
} from "../utils/gameLogic";
import Analytics from "./Analytics";
import Board from "./Board";
import "./Game.scss";
import { PieceType } from "./Piece";

const Game = () => {
	const BOARD_SIZE = 8;
	const [board, setBoard] = useState<number[][]>([[]]);
	const [lastPlayer, setLastPlayer] = useState<PieceType>(PieceType.Empty);
	const [winner, setWinner] = useState<PieceType>(PieceType.Empty);
	const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
	const [doubleJumpMoves, setDoubleJumpMoves] = useState<Move[]>([]);
	const [startTime, setStartTime] = useState<number>(0);
	const [movesMade, setMovesMade] = useState<number>(0);
	const AI_MOVE_TIME = 1000;

	//
	useEffect(() => {
		initializeGame();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		winner !== PieceType.Empty && console.log("WINNER FOUND", winner);
	}, [winner]);

	useEffect(() => {
		onTurnEnd();

		// eslint-disable-next-line
	}, [lastPlayer, doubleJumpMoves]);

	const checkWinner = (boardToEvaluate: number[][]) => {
		if (boardToEvaluate.length > 1) {
			const w =
				winner === PieceType.Empty
					? evaluateWinner(boardToEvaluate, lastPlayer)
					: winner;
			setWinner(w);
		}
	};

	const onTurnEnd = () => {
		checkWinner(board);

		lastPlayer === PieceType.Red &&
			setTimeout(() => {
				makeEnemyMove();
			}, AI_MOVE_TIME);
	};

	const initializeGame = () => {
		const initialBoard = initializeBoard();
		setBoard(initialBoard);

		setLastPlayer(PieceType.Empty);
		setWinner(PieceType.Empty);
		setStartTime(performance.now());
		setMovesMade(0);
	};

	const makeEnemyMove = () => {
		var allEnemyMoves = getAllMoves(board, PieceType.Blue);
		allEnemyMoves.length > 0 && makeMove(allEnemyMoves[0]);
	};

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
		// arr[1][4] = PieceType.Blue;

		// arr[3][4] = PieceType.Red;
		// arr[4][5] = PieceType.Red;
		// arr[6][5] = PieceType.Red;

		return arr;
	};

	const onDrop = async (event: any) => {
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

			setPossibleMoves([]);
		}

		event.dataTransfer.clearData();
	};
	const makeMove = (moveBeingMade: Move) => {
		const start = moveBeingMade.start;
		const end = moveBeingMade.end;
		const cap = moveBeingMade.captured;
		const initialValue = board[start.x][start.y];

		var updatedBoard: number[][] = [];

		setBoard((board) => {
			updatedBoard = board.map((row, i) => {
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
			const doubleJumps = getValidMovesByPosition(
				updatedBoard,
				end.x,
				end.y
			).filter((move) => {
				return move.captured !== undefined;
			});
			const canCaptureAgain = cap && doubleJumps.length !== 0;

			if (canCaptureAgain) {
				setDoubleJumpMoves(doubleJumps);
			} else {
				setLastPlayer(initialValue);

				setDoubleJumpMoves([]);
			}
			return updatedBoard;
		});
		setMovesMade((numMovesMade) => {
			return numMovesMade + 1;
		});
	};
	const onDragOver = (event: any) => {
		event.preventDefault();
	};
	const onDragStart = (event: any) => {
		event.dataTransfer.setData("text/plain", event.target.id);
	};
	const onMouseEnterPiece = (event: any) => {
		var parent = event.target.parentElement;
		if (parent.tagName.toLowerCase() === "span") {
			parent = parent.parentElement;
		}

		const x = parseFloat(parent.dataset.x);
		const y = parseFloat(parent.dataset.y);

		const validSquares = getValidSquares(board, x, y);

		const onRedPiece =
			board[x][y] === PieceType.Red && lastPlayer !== PieceType.Red;

		if (onRedPiece && doubleJumpMoves.length === 0) {
			setPossibleMoves(validSquares);
		} else if (
			onRedPiece &&
			doubleJumpMoves.length > 0 &&
			x === doubleJumpMoves[0].start.x &&
			y === doubleJumpMoves[0].start.y
		) {
			setPossibleMoves(doubleJumpMoves);
		}
	};
	const onMouseLeavePiece = (event: any) => {
		setPossibleMoves([]);
	};

	return (
		<div className="game">
			<Board
				arr={board}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onDragStart={onDragStart}
				onMouseEnterPiece={onMouseEnterPiece}
				onMouseLeavePiece={onMouseLeavePiece}
				possibleMoves={possibleMoves}
			/>
			<Analytics
				startTime={startTime}
				movesMade={movesMade}
				winner={winner}
				lastPlayer={lastPlayer}
				redPiecesLeft={getPiecesLeft(board, PieceType.Red)}
				bluePiecesLeft={getPiecesLeft(board, PieceType.Blue)}
				resetGame={initializeGame}
			/>
		</div>
	);
};

export default Game;
