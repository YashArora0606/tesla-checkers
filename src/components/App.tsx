import React from "react";
import "./App.scss";
import Game from "./Game";

function App() {
	return (
		<div className="App">
			<div className="mid-section">
				<div className="heading">
					<h1>Welcome to Checkers++</h1>
					<p className="subtitle">
						<b>
							Click and drag{" "}
							<span className="red">your pieces</span> to defeat
							the <span className="blue">enemy</span>!
						</b>
					</p>
				</div>

				<Game />
			</div>
		</div>
	);
}

export default App;
