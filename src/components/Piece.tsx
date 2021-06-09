import React, { useContext } from "react";
import { BoardContext } from "./Board";
import "./Piece.scss";

export enum PieceType {
	Empty,
	Red,
	Blue,
}

type PieceProps = {
	pieceType: PieceType;
	id: string;
};

const Piece = ({ pieceType, id }: PieceProps) => {
	const { board, setBoard } = useContext(BoardContext);

	const onDragStart = (event: any) => {
		event.dataTransfer.setData("text/plain", event.target.id);
		pieceType !== PieceType.Red && event.preventDefault();
		highlightValidMoves();
	};

	const highlightValidMoves = () => {
		console.log("CALLING_______________________");
		const newBoard = board.map((list) => {
			const row = list.map((item) => {
				return 1;
			});
			return row;
		});
		setBoard(newBoard);
	};

	return pieceType !== PieceType.Empty ? (
		<span
			id={id}
			className={
				pieceType === PieceType.Red
					? "piece red-piece"
					: "piece blue-piece"
			}
			draggable={pieceType === PieceType.Red}
			onDragStart={onDragStart}
		/>
	) : null;
};

export default Piece;
