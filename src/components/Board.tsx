import React, { useEffect, useState } from "react";
import "./Board.scss";

enum BoardValue {
	Empty,
	Red,
	Blue,
}

const Board = () => {
	const BOARD_SIZE = 8;

	const [board, setBoard] = useState<number[][]>([[]]);

	// eslint-disable-next-line
	useEffect(() => {
		var arr = new Array(BOARD_SIZE).fill(BoardValue.Empty).map(() => {
			return new Array(BOARD_SIZE).fill(BoardValue.Empty);
		});
		arr.forEach((row, i) => {
			row.forEach((square, j) => {
				(i + j) % 2 !== 0 && i <= 2 && (arr[i][j] = BoardValue.Blue);
				(i + j) % 2 !== 0 && i >= 5 && (arr[i][j] = BoardValue.Red);
			});
		});
		setBoard(arr);
	}, []);

	return (
		<div>
			<table className="game-board">
				<tbody>
					{board.map((row, i) => {
						return (
							<tr key={`row-${i}`}>
								{row.map((item, j) => {
									return (
										<td
											key={`cell-${j}`}
											className={
												(i + j) % 2 !== 0
													? "dark-square"
													: "light-square"
											}
											onClick={() => {
												console.log(i, j);
											}}
										>
											{item !== BoardValue.Empty &&
												(item === BoardValue.Red ? (
													<button className="red-piece">
														{/* red */}
													</button>
												) : (
													<button className="blue-piece">
														{/* blue */}
													</button>
												))}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Board;
