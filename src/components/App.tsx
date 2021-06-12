import React from "react";
import "./App.scss";
import Game from "./Game";

function App() {
	return (
		<div className="App">
			<div className="mid-section">
				<div className="heading">
					<h1>Welcome to CheckerBot™</h1>
					<p className="subtitle">
						<b>
							Help the
							<span className="red"> renewable energy orbs </span>
							defeat the
							<span className="blue"> oil and gas industry</span>!
						</b>
					</p>
					<p>
						<b>
							Code, features, and the full list of rules are
							available{" "}
							<a
								className="red"
								target="_blank"
								rel="noreferrer"
								href="https://github.com/YashArora0606/tesla-checkers"
							>
								here
							</a>
							.
						</b>
					</p>
				</div>

				<Game />
			</div>
		</div>
	);
}

export default App;
