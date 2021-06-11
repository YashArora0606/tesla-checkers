import React, { useEffect, useState } from "react";
import "./Analytics.scss";
import { PieceType } from "./Piece";

type AnalyticsProps = {
	startTime: number;
	movesMade: number;
	lastPlayer: PieceType;
	winner: PieceType;
};

const Analytics = ({
	startTime,
	movesMade,
	lastPlayer,
	winner,
}: AnalyticsProps) => {
	const MINUTE_MS = 1000;

	const [timeElapsed, setTimeElapsed] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			var endTime = performance.now();
			var timeDiff = endTime - startTime; //in ms
			// strip the ms
			timeDiff /= 1000;
			// get seconds
			var seconds = Math.round(timeDiff);
			setTimeElapsed(seconds);
		}, MINUTE_MS);

		return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
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
			<p>Time Elapsed: {formatTime(timeElapsed)}</p>
			<p>Turn: {lastPlayer !== PieceType.Red ? "Player" : "AI"}</p>
			<p>Winner: {winner}</p>
			<p>Moves Made: {movesMade}</p>
		</div>
	);
};

export default Analytics;
