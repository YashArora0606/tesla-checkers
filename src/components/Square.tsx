import React, { ReactNode } from "react";
import "./Square.scss";

type SquareProps = {
	x: number;
	y: number;
	children: ReactNode;
	onDrop: (e: any) => void;
	onDragOver: (e: any) => void;
	id: string;
	highlight: boolean;
};

const Square = ({
	x,
	y,
	children,
	onDrop,
	onDragOver,
	id,
	highlight,
}: SquareProps) => {
	return (
		<div
			id={id}
			data-x={x}
			data-y={y}
			className={
				"square " +
				((x + y) % 2 !== 0 ? "dark-square" : "light-square") +
				(highlight ? " highlighted" : "")
			}
			onDragOver={onDragOver}
			onDrop={onDrop}
			draggable={false}
		>
			{children}
		</div>
	);
};

export default Square;
