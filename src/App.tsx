import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import P5JS_App from "./p5/p5mapper";
import Three_App from "./component/3dcomponent";
import Paper_App from "./paper/main";

function App() {
	return (
		<div className="App">
			<header className="App-header">
			{/* <Container>
					<Three_App/>
				</Container>
				<Container>
					<P5JS_App/>
				</Container> */}
				<Container>
					<Paper_App/>
				</Container>
			</header>
		</div>
	)
}

export default App;
