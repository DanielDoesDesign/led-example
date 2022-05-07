import { useState } from "react";
import { Container } from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
// import P5JS_App from "./p5/p5mapper";
import Three_App from "./component/3dcomponent";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<header className="App-header">
				{/* <Container>
					<P5JS_App />
				</Container> */}
				<Container>
					<Three_App />
				</Container>
				<img src={logo} className="App-logo" alt="logo" />
				<p>Hello Vite + React!</p>
				<p>
					<button
						type="button"
						onClick={() => setCount((count) => count + 1)}
					>
						count is: {count}
					</button>
				</p>
				<p>
					Edit <code>App.tsx</code> and save to test HMR updates.
				</p>
				<p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					{" | "}
					<a
						className="App-link"
						href="https://vitejs.dev/guide/features.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Vite Docs
					</a>
				</p>
			</header>
		</div>
	);
}

export default App;
