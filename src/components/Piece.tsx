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
	onDragStart: (e: any) => void;
	onMouseEnter: (e?: any) => void;
	onMouseLeave: (e?: any) => void;
};

const Piece = ({
	pieceType,
	id,
	onDragStart,
	onMouseEnter,
	onMouseLeave,
}: PieceProps) => {
	return pieceType !== PieceType.Empty ? (
		<span
			id={id}
			className={
				pieceType === PieceType.Red
					? "piece red-piece"
					: "piece blue-piece"
			}
			draggable={true}
			onDragStart={onDragStart}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		/>
	) : null;
};

export default Piece;
