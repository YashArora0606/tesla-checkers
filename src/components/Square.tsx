import React from "react";
import Piece, { PieceType } from "./Piece";
import "./Square.scss";

export enum SquareType {
	Light,
	Dark,
}

type SquareProps = {
	squareType: SquareType;
	pieceType: PieceType;
	id: string;
};

const Square = ({ squareType, pieceType, id }: SquareProps) => {
	const onDragOver = (event: any) => {
		event.preventDefault();
	};

	const onDrop = (event: any) => {
		const id = event.dataTransfer.getData("text");
		const draggableElement = document.getElementById(id);
		const dropzone = event.target;
		if (dropzone.localName === "td" && dropzone.childElementCount === 0) {
			console.log(dropzone.id);
			dropzone.appendChild(draggableElement);
		}
		event.dataTransfer.clearData();
	};

	return (
		<td
			id={`sq-${id}`}
			className={
				squareType === SquareType.Dark ? "dark-square" : "light-square"
			}
			onDragOver={onDragOver}
			onDrop={onDrop}
			draggable={false}
		>
			<Piece pieceType={pieceType} id={id} />
		</td>
	);
};

export default Square;
