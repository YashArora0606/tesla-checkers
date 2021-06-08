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
	x: number;
	y: number;
	attemptMove: (x: number, y: number, newX: number, newY: number) => boolean;
};

const Square = ({ x, y, squareType, pieceType, attemptMove }: SquareProps) => {
	const onDragOver = (event: any) => {
		event.preventDefault();
	};

	const onDrop = (event: any) => {
		const id = event.dataTransfer.getData("text");
		const draggableElement = document.getElementById(id);
		const dropzone = event.target;

		const dropzoneIsDroppable =
			dropzone.className.includes("square") &&
			dropzone.childElementCount === 0 &&
			draggableElement !== null;

		if (dropzoneIsDroppable) {
			// const moveIsValid = attemptMove(x, y, xDestination, yDestination);

			const moveIsValid = true;
			moveIsValid && dropzone.appendChild(draggableElement);
		}

		event.dataTransfer.clearData();
	};

	return (
		<div
			id={`sq-${x}-${y}`}
			className={
				"square " +
				(squareType === SquareType.Dark
					? "dark-square"
					: "light-square")
			}
			onDragOver={onDragOver}
			onDrop={onDrop}
			draggable={false}
		>
			<Piece pieceType={pieceType} id={`pc-${x}-${y}`} />
		</div>
	);
};

export default Square;
