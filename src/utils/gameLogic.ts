import { PieceType } from "../components/Piece";

const inBounds = (board: number[][], x: number, y: number) => {
	return x >= 0 && y >= 0 && x < board.length && y < board[0].length;
};

export type Move = {
	start: { x: number; y: number };
	end: { x: number; y: number };
	captured?: { x: number; y: number };
};

export const getValidSquares = (board: number[][], x: number, y: number) => {
	// 1 up and to the right
	// 1 up and to the left
	// 2 up, 2 to the right, capturing piece between
	// 2 up, 2 to the left, capturing piece between
	var validMoves: Move[] = [];
	if (board[x][y] !== PieceType.Red) {
		return validMoves;
	}
	if (inBounds(board, x - 1, y - 1)) {
		if (board[x - 1][y - 1] === PieceType.Empty) {
			validMoves.push({
				start: { x: x, y: y },
				end: { x: x - 1, y: y - 1 },
			});
		} else if (
			board[x - 1][y - 1] === PieceType.Blue &&
			inBounds(board, x - 2, y - 2) &&
			board[x - 2][y - 2] === PieceType.Empty
		) {
			validMoves.push({
				start: { x: x, y: y },
				end: { x: x - 2, y: y - 2 },
				captured: { x: x - 1, y: y - 1 },
			});
		}
	}
	if (inBounds(board, x - 1, y + 1)) {
		if (board[x - 1][y + 1] === PieceType.Empty) {
			validMoves.push({
				start: { x: x, y: y },
				end: { x: x - 1, y: y + 1 },
			});
		} else if (
			board[x - 1][y + 1] === PieceType.Blue &&
			inBounds(board, x - 2, y + 2) &&
			board[x - 2][y + 2] === PieceType.Empty
		) {
			validMoves.push({
				start: { x: x, y: y },
				end: { x: x - 2, y: y + 2 },
				captured: { x: x - 1, y: y + 1 },
			});
		}
	}

	const captures = validMoves.filter((move) => {
		return move.captured !== undefined;
	});

	return captures.length > 0 ? captures : validMoves;
};
