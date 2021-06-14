import React, { useEffect, useState } from "react";
import {
	evaluateWinner,
	getAllMoves,
	getPiecesLeft,
	getValidMovesByPosition,
	getValidMoves,
	isType,
	Move,
} from "../utils/gameLogic";
import Analytics from "./Analytics";
import Board from "./Board";
import "./Game.scss";
import { PieceType } from "./Piece";

const Game = () => {
	const BOARD_SIZE = 8;
	const AI_MOVE_TIME = 1000;

	const [board, setBoard] = useState<number[][]>([[]]);
	const [lastPlayer, setLastPlayer] = useState<PieceType>(PieceType.Empty);
	const [winner, setWinner] = useState<PieceType>(PieceType.Empty);
	const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
	const [doubleJumpMoves, setDoubleJumpMoves] = useState<Move[]>([]);
	const [startTime, setStartTime] = useState<number>(0);
	const [movesMade, setMovesMade] = useState<number>(0);

	// Initial setup of the game
	useEffect(() => {
		initializeGame();
		// eslint-disable-next-line
	}, []);

	// Evaluate the board for a winner after each turn
	useEffect(() => {
		if (board.length > 1) {
			const w = isType(winner, PieceType.Empty)
				? evaluateWinner(board, lastPlayer)
				: winner;
			setWinner(w);
		}

		// Make AI Move if needed
		isType(lastPlayer, PieceType.Red) &&
			setTimeout(() => {
				var allEnemyMoves = getAllMoves(board, PieceType.Blue);
				allEnemyMoves.length > 0 && makeMove(allEnemyMoves[0]);
			}, AI_MOVE_TIME);
		// eslint-disable-next-line
	}, [lastPlayer, doubleJumpMoves]);

	// Reset all state values to initial state
	const initializeGame = () => {
		var initialBoard = new Array(BOARD_SIZE)
			.fill(PieceType.Empty)
			.map(() => {
				return new Array(BOARD_SIZE).fill(PieceType.Empty);
			});
		initialBoard.forEach((row, i) => {
			row.forEach((square, j) => {
				(i + j) % 2 !== 0 &&
					i <= 2 &&
					(initialBoard[i][j] = PieceType.Blue);
				(i + j) % 2 !== 0 &&
					i >= 5 &&
					(initialBoard[i][j] = PieceType.Red);
			});
		});

		// Enemy multijumpings
		// initialBoard[1][4] = PieceType.Blue;
		// initialBoard[3][4] = PieceType.Red;
		// initialBoard[4][5] = PieceType.Red;
		// initialBoard[6][5] = PieceType.Red;

		// Player multijump must be with same piece
		// initialBoard[1][4] = PieceType.Blue;
		// initialBoard[5][4] = PieceType.Blue;
		// initialBoard[3][4] = PieceType.Blue;
		// initialBoard[4][5] = PieceType.Red;
		// initialBoard[6][5] = PieceType.Red;

		// Multijump with king's checker
		// initialBoard[1][4] = PieceType.Blue;
		// initialBoard[1][6] = PieceType.Blue;
		// initialBoard[3][4] = PieceType.Blue;
		// initialBoard[4][5] = PieceType.Red;

		setBoard(initialBoard);
		setLastPlayer(PieceType.Empty);
		setWinner(PieceType.Empty);
		setStartTime(performance.now());
		setPossibleMoves([]);
		setDoubleJumpMoves([]);
		setMovesMade(0);
	};

	// Process the move once the user drops the piece onto a square
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

	// Update state values based on given move
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
			updatedBoard[0] = updatedBoard[0].map((item) => {
				return isType(item, PieceType.Red) ? PieceType.RedKing : item;
			});
			updatedBoard[updatedBoard.length - 1] = updatedBoard[
				updatedBoard.length - 1
			].map((item) => {
				return isType(item, PieceType.Blue) ? PieceType.BlueKing : item;
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

	// Event will be handled explicitly on drop rather than dragover
	const onDragOver = (event: any) => {
		event.preventDefault();
	};

	// Express that the selected element is being dragged
	const onDragStart = (event: any) => {
		event.dataTransfer.setData("text/plain", event.target.id);
	};

	// Highlight squares on mouse over
	const onMouseOverPiece = (event: any) => {
		var parent = event.target.parentElement;
		if (parent.tagName.toLowerCase() === "span") {
			parent = parent.parentElement;
		}

		const x = parseFloat(parent.dataset.x);
		const y = parseFloat(parent.dataset.y);

		const validSquares = getValidMoves(board, x, y);

		const onRedPiece =
			isType(board[x][y], PieceType.Red) &&
			!isType(lastPlayer, PieceType.Red);

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

	// Stop highlighting squares when mouse leaves piece
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
				onMouseOverPiece={onMouseOverPiece}
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
