import React, { useEffect, useState } from "react";
import { isType } from "../utils/gameLogic";
import "./Analytics.scss";
import { PieceType } from "./Piece";

type AnalyticsProps = {
	startTime: number;
	movesMade: number;
	lastPlayer: PieceType;
	winner: PieceType;
	redPiecesLeft: PieceType;
	bluePiecesLeft: PieceType;
	resetGame: () => void;
};

const Analytics = ({
	startTime,
	movesMade,
	lastPlayer,
	winner,
	redPiecesLeft,
	bluePiecesLeft,
	resetGame,
}: AnalyticsProps) => {
	const MINUTE_MS = 1000;

	const [timeElapsed, setTimeElapsed] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			var endTime = performance.now();
			var timeDiff = endTime - startTime;
			timeDiff /= 1000;
			var seconds = Math.round(timeDiff);
			setTimeElapsed(seconds);
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, [startTime]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const sec = seconds % 60;
		var secondsString = sec.toString();
		var minutesString = minutes.toString();

		if (sec < 10) {
			secondsString = "0" + secondsString;
		}
		if (minutes < 10) {
			minutesString = "0" + minutesString;
		}

		return `${minutesString}:${secondsString}`;
	};

	return (
		<div className="analytics">
			{isType(winner, PieceType.Empty) ? (
				<div>
					<p>
						<b>
							Move #{movesMade + 1} - {formatTime(timeElapsed)}
						</b>
					</p>
					<p>
						<b>
							{isType(lastPlayer, PieceType.Red) ? (
								<b className="blue">
									{"The AI is thinking..."}
								</b>
							) : (
								<b className="red">{`It's your turn!`}</b>
							)}
						</b>
					</p>
					<p>
						<b className="red">{`${redPiecesLeft} Pieces`}</b>
						<b> : </b>
						<b className="blue">{`${bluePiecesLeft} Pieces`}</b>
					</p>
				</div>
			) : (
				<div>
					<p>
						{isType(winner, PieceType.Red) ? (
							<b className="red">Congrats, you won!</b>
						) : (
							<b className="blue">Aw, you lost!</b>
						)}
					</p>
				</div>
			)}

			<button className="reset-button" onClick={resetGame}>
				<b>Reset Game</b>
			</button>
		</div>
	);
};

export default Analytics;
