import { useState } from "react";
import "./App.css";
import P5JS_App from "./p5/p5mapper";
import Three_App from "./components/3dcomponent";
import Paper_App from "./paper/main";
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel, Grid, GridItem, Box, Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { testButton, parseDXF } from "./three/core/helperFunc"

function App() {

	return (


		<div className="App">

			<header className="App-header">
				<Container minW='1500px' centerContent>
					<Tabs isFitted variant='enclosed'>
						<TabList>
							<Tab>PaperJS</Tab>
							<Tab>ThreeJS</Tab>
							<Tab>Other</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>

								<Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
									<GridItem rowSpan={1} bg='darkgrey'>
										Design Pick<br></br>
										<Button colorScheme='green' onClick={testButton}>TEST</Button>
										<br></br>
										<Button colorScheme='green' onClick={parseDXF}>Unicorn</Button><br></br>
										<Button colorScheme='blue'>Bear</Button><br></br>
										<Button colorScheme='red'>Geo1</Button><br></br>
										<Button colorScheme='yellow'>Geo2</Button><br></br>
									</GridItem>
									<GridItem colSpan={1} rowStart={2} colStart={1} bg='darkgrey'>
										Move Controls<br></br>
										<br></br>
										<br></br>
										<br></br>
										<Button colorScheme='red'>^</Button><br></br>
										<Button colorScheme='red'> {'<'} </Button>   <Button colorScheme='red'> {'>'} </Button><br></br>
										<Button colorScheme='red'>v</Button><br></br>
									</GridItem>
									<GridItem rowSpan={2} bg='darkgrey'>
										<Paper_App />
									</GridItem>
									<GridItem rowSpan={1} bg='darkgrey'>
										Functions<br></br>
										<Button colorScheme='blue'>Import DXF</Button><br></br>
										<Button colorScheme='blue'>UpdateLEDs</Button><br></br>

										<Button colorScheme='blue'>Draw Line</Button><br></br>
										<Button colorScheme='blue'>Add LED</Button><br></br>
										<Button colorScheme='blue'>Move Points</Button><br></br>

									</GridItem>
									<GridItem colSpan={1} rowStart={2} colStart={3} bg='darkgrey'>
										Output<br></br>
										<Button colorScheme='blue'>Export Design</Button><br></br>
									</GridItem>
								</Grid>

							</TabPanel>
							<TabPanel>

								<Grid templateColumns='repeat(5, 1fr)' gap={4}>
									<GridItem colSpan={2} h='800' bg='darkgrey' />
									<Three_App />
									<GridItem colStart={4} colEnd={6} h='800' bg='darkgrey' />
								</Grid>

							</TabPanel>
							<TabPanel>

								<Grid templateColumns='repeat(5, 1fr)' gap={4}>
									<GridItem colSpan={2} h='800' bg='darkgrey' />
									<Box bg='red' minW='800' p={4} color='white'>
										Upcoming Feature Placeholder
									</Box>
									<GridItem colStart={4} colEnd={6} h='800' bg='darkgrey' />
								</Grid>

							</TabPanel>
						</TabPanels>
					</Tabs>
				</Container>

			</header>
		</div >
	)
}

export default App;




