import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import P5JS_App from "./p5/p5mapper";
import Three_App from "./component/3dcomponent";
import Paper_App from "./paper/main";
import styled from "styled-components"

interface TabProps {
	selected: boolean;

}


const Tab = styled.div<TabProps>`
	color: red;
	flex: 1;		
	background-color: ${props => props.selected ? "black" : "grey"};


`
const TabContainer = styled.div`
	display: flex;
	width: 60%;
	

`

function App() {

	const [tabIndex, setTabIndex] = useState(0);

	return (
		<div className="App">
			<header className="App-header">
				<TabContainer>
					<Tab onClick={() => setTabIndex(0)} selected={tabIndex == 0}>PaperJS</Tab>
					<Tab onClick={() => setTabIndex(1)} selected={tabIndex == 1}>ThreeJS</Tab>
				</TabContainer>

				<div>
					{tabIndex === 0 && <Container>
						<Paper_App />
					</Container>}
					{tabIndex === 1 && <Container>
						<Three_App />
					</Container>}
				</div>
			</header>
		</div>
	)
}

export default App;




