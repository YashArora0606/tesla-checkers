import { PieceType } from "../components/Piece";

export type Move = {
	start: { x: number; y: number };
	end: { x: number; y: number };
	captured?: { x: number; y: number };
};

// Checks if given values are in bounds of the board
const inBounds = (board: number[][], x: number, y: number) => {
	return x >= 0 && y >= 0 && x < board.length && y < board[0].length;
};

// Checks that pieces are of the same color, regardless of king status
export const isType = (piece1: PieceType, piece2: PieceType) => {
	if (piece1 === PieceType.Empty && piece2 === PieceType.Empty) {
		return true;
	}
	if (
		(piece1 === PieceType.Red || piece1 === PieceType.RedKing) &&
		(piece2 === PieceType.Red || piece2 === PieceType.RedKing)
	) {
		return true;
	}
	if (
		(piece1 === PieceType.Blue || piece1 === PieceType.BlueKing) &&
		(piece2 === PieceType.Blue || piece2 === PieceType.BlueKing)
	) {
		return true;
	}
	return false;
};

// Returns the opposite piece colour
export const oppositePiece = (piece: PieceType) => {
	if (isType(piece, PieceType.Red)) {
		return PieceType.Blue;
	} else if (isType(piece, PieceType.Blue)) {
		return PieceType.Red;
	}
	return piece;
};

// Returns boolean representing whether the piece is a king
export const isKing = (piece: PieceType) => {
	return piece === PieceType.BlueKing || piece === PieceType.RedKing;
};

// Returns list of all possilbe moves given a particular piece color
export const getAllMoves = (board: number[][], piece: PieceType) => {
	var allMoves: Move[] = [];
	board.forEach((row, i) => {
		row.forEach((item, j) => {
			if (isType(item, piece)) {
				const moves = getValidMovesByPosition(board, i, j);
				moves.forEach((move) => allMoves.push(move));
			}
		});
	});

	const captures = allMoves.filter((move) => {
		return move.captured !== undefined;
	});
	return captures.length > 0 ? captures : allMoves;
};

// Checks the given board for a winner
export const evaluateWinner = (board: number[][], lastPlayer: PieceType) => {
	var winner = PieceType.Empty;
	if (board.length === 1 && board[0].length === 0) {
		winner = PieceType.Empty;
	} else if (
		!board.some((row) => row.some((item) => isType(item, PieceType.Red)))
	) {
		winner = PieceType.Blue;
	} else if (
		!board.some((row) => row.some((item) => isType(item, PieceType.Blue)))
	) {
		winner = PieceType.Red;
	} else if (getAllMoves(board, oppositePiece(lastPlayer)).length === 0) {
		winner = lastPlayer;
	}
	return winner;
};

export const getPiecesLeft = (board: number[][], piece: PieceType) => {
	var amount = 0;
	board.forEach((row) => {
		row.forEach((item) => {
			isType(item, piece) && amount++;
		});
	});
	return amount;
};

// Returns possible valid moves given piece being hovered
export const getValidMoves = (board: number[][], x: number, y: number) => {
	const piece = board[x][y];
	const allMoves = getAllMoves(board, piece);

	const movesForPiece = getValidMovesByPosition(board, x, y);

	if (allMoves.some((move) => move.captured !== undefined)) {
		return movesForPiece.filter((move) => move.captured !== undefined);
	}
	return movesForPiece;
};

// Returns possible valid moves for a particular piece, without taking
// into account other pieces that may be required to capture
export const getValidMovesByPosition = (
	board: number[][],
	x: number,
	y: number
) => {
	var validMoves: Move[] = [];
	const piece = board[x][y];
	var offsets = [];

	if (isKing(piece)) {
		offsets.push(1);
		offsets.push(-1);
	} else if (isType(piece, PieceType.Red)) {
		offsets.push(1);
	} else if (isType(piece, PieceType.Blue)) {
		offsets.push(-1);
	}

	offsets.forEach((offset) => {
		if (inBounds(board, x - offset, y - 1)) {
			if (board[x - offset][y - 1] === PieceType.Empty) {
				validMoves.push({
					start: { x: x, y: y },
					end: { x: x - offset, y: y - 1 },
				});
			} else if (
				isType(board[x - offset][y - 1], oppositePiece(piece)) &&
				inBounds(board, x - 2 * offset, y - 2) &&
				board[x - 2 * offset][y - 2] === PieceType.Empty
			) {
				validMoves.push({
					start: { x: x, y: y },
					end: { x: x - 2 * offset, y: y - 2 },
					captured: { x: x - offset, y: y - 1 },
				});
			}
		}
		if (inBounds(board, x - offset, y + 1)) {
			if (board[x - offset][y + 1] === PieceType.Empty) {
				validMoves.push({
					start: { x: x, y: y },
					end: { x: x - offset, y: y + 1 },
				});
			} else if (
				isType(board[x - offset][y + 1], oppositePiece(piece)) &&
				inBounds(board, x - 2 * offset, y + 2) &&
				board[x - 2 * offset][y + 2] === PieceType.Empty
			) {
				validMoves.push({
					start: { x: x, y: y },
					end: { x: x - 2 * offset, y: y + 2 },
					captured: { x: x - offset, y: y + 1 },
				});
			}
		}
	});

	const captures = validMoves.filter((move) => {
		return move.captured !== undefined;
	});

	return captures.length > 0 ? captures : validMoves;
};
