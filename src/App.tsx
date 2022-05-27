import { useState } from "react";
import "./App.css";
import P5JS_App from "./p5/p5mapper";
import Three_App from "./components/3dcomponent";
import Paper_App from "./paper/main";

import Button from '@mui/material/Button';
import React, { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TestControls } from "./mui/MUI"

function App() {

	return (

		<div className="App">
			<header className="App-header">
				<TestControls />
				<Paper_App />
			</header>
		</div >
	);

}

export default App;


