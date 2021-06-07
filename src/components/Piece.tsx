import React from "react";
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
	const onDragStart = (event: any) => {
		event.dataTransfer.setData("text/plain", event.target.id);
		// event.currentTarget.style.backgroundColor = "yellow";
	};

	return pieceType !== PieceType.Empty ? (
		<button
			id={`pc-${id}`}
			className={pieceType === PieceType.Red ? "red-piece" : "blue-piece"}
			draggable={pieceType === PieceType.Red}
			onDragStart={onDragStart}
		/>
	) : null;
};

export default Piece;
