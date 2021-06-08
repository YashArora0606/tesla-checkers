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
		pieceType !== PieceType.Red && event.preventDefault();
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
