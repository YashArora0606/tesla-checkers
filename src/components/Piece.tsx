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
			draggable={pieceType === PieceType.Red}
			onDragStart={onDragStart}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<span
				className="emoji"
				draggable={false}
				// tabIndex={-1}
				onDragStart={(e: any) => {
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				{pieceType === PieceType.Red ? "⚡" : "⛽"}
			</span>
		</span>
	) : null;
};

export default Piece;
