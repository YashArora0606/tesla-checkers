import { PieceType } from "../components/Piece";

const inBounds = (board: number[][], x: number, y: number) => {
	return x >= 0 && y >= 0 && x < board.length && y < board[0].length;
};

const oppositePiece = (piece: PieceType) => {
	if (piece === PieceType.Red) {
		return PieceType.Blue;
	} else if (piece === PieceType.Blue) {
		return PieceType.Red;
	}
	return piece;
}

export type Move = {
	start: { x: number; y: number };
	end: { x: number; y: number };
	captured?: { x: number; y: number };
};

export const getValidSquares = (board: number[][], x: number, y: number) => {
	var validMoves: Move[] = [];

	const piece = board[x][y];

	var offset = 1;
	if (piece === PieceType.Blue) {
		offset = -1;
	}

	if (inBounds(board, x - offset, y - 1)) {
		if (board[x - offset][y - 1] === PieceType.Empty) {
			validMoves.push({
				start: { x: x, y: y },
				end: { x: x - offset, y: y - 1 },
			});
		} else if (
			board[x - offset][y - 1] === oppositePiece(piece) &&
			inBounds(board, x - 2, y - 2) &&
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
			board[x - offset][y + 1] === oppositePiece(piece) &&
			inBounds(board, x - 2, y + 2) &&
			board[x - 2 * offset][y + 2] === PieceType.Empty
		) {
			validMoves.push({
				start: { x: x, y: y },
				end: { x: x - 2 * offset, y: y + 2 },
				captured: { x: x - offset, y: y + 1 },
			});
		}
	}

	const captures = validMoves.filter((move) => {
		return move.captured !== undefined;
	});

	return captures.length > 0 ? captures : validMoves;
};
