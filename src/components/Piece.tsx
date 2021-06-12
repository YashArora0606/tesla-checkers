import React from "react";
import { isKing, isType } from "../utils/gameLogic";
import "./Piece.scss";

export enum PieceType {
	Empty,
	Red,
	Blue,
	RedKing,
	BlueKing,
}

type PieceProps = {
	pieceType: PieceType;
	id: string;
	onDragStart: (e: any) => void;
	onMouseOver: (e?: any) => void;
	onMouseLeave: (e?: any) => void;
};

const Piece = ({
	pieceType,
	id,
	onDragStart,
	onMouseOver,
	onMouseLeave,
}: PieceProps) => {
	return !isType(pieceType, PieceType.Empty) ? (
		<span
			id={id}
			className={`piece ${isKing(pieceType) ? "king" : ""} ${
				isType(pieceType, PieceType.Red) ? "red-piece" : "blue-piece"
			}`}
			draggable={isType(pieceType, PieceType.Red)}
			onDragStart={onDragStart}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
		>
			<span
				className="emoji"
				draggable={false}
				onDragStart={(e: any) => {
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				{isType(pieceType, PieceType.Red) ? "⚡" : "⛽"}
			</span>
		</span>
	) : null;
};

export default Piece;
