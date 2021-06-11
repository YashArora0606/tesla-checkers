import { PieceType } from "../components/Piece";

export const getValidSquares = (board: number[][], x: number, y: number) => {
	// 1 up and to the right
	// 1 up and to the left
	// 2 up, 2 to the right, capturing piece between
	// 2 up, 2 to the left, capturing piece between
	var validMoves = new Set<string>();
	if (board[x][y] !== 1) {
		return validMoves;
	}
	if (x > 0 && y > 0) {
		if (board[x - 1][y - 1] === PieceType.Empty) {
			validMoves.add(`${x - 1}-${y - 1}`);
		}
	}
	if (x > 0 && y < board.length - 1) {
		if (board[x - 1][y + 1] === PieceType.Empty) {
			validMoves.add(`${x - 1}-${y + 1}`);
		}
	}
	return validMoves;
};
