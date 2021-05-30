import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getData, updateDBData, resetDBData, exportDBData, importDBData } from "./services/dbServices";
import { saveAs } from "file-saver";
import Spinner from "react-bootstrap/Spinner";
import TopicCard from "./components/TopicCard/TopicCard";
import Topic from "./components/Topic/Topic";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Settings from "./components/Settings Page/Settings";
import ReactGA from "react-ga";
import "./App.css";

function App(prop) {

	// setting state for data received from the DB
	const [questionData, setquestionData] = useState([]);

	// useEffect for fetching data from DB on load and init GA
	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
		ReactGA.pageview(window.location.pathname + window.location.search);
		getData((QuestionData) => {
			setquestionData(QuestionData);
		});
	}, []);

	//to update progress in '/' route and also update DB
	function updateData(key, topicData, topicPosition) {
		let reGenerateUpdatedData = questionData.map((topic, index) => {
			if (index === topicPosition) {
				updateDBData(key, topicData);
				return { topicName: topic.topicName, position: topic.position, ...topicData };
			} else {
				return topic;
			}
		});
		setquestionData(reGenerateUpdatedData);
	}

	// reset and clear DB
	function resetData() {
		resetDBData((response) => {
			setquestionData([]);
			window.location.replace(window.location.origin);
		});
	}

	// export 450DSA-Progress data

	function exportData(callback) {
		exportDBData((data) => {
			const fileData = JSON.stringify(data);
			const blob = new Blob([fileData], { type: "text/plain" });
			saveAs(blob, "progress.json");
			callback();
		});
	}

	// import 450DSA-Progress data

	function importData(data, callback) {
		importDBData(data, (QuestionData) => {
			setquestionData(QuestionData);
			callback();
		});
	}

	// picking random question and opening it in new tab

	function pickRandom() {
		let topicNumber = Math.floor(Math.random() * 16);
		let questionNo = Math.floor(Math.random() * questionData[topicNumber].questions.length)
		window.open(`${questionData[topicNumber].questions[questionNo].URL}`)
	}

	return (
		<Router>
			<div className="App">
				<h1 className="app-heading text-center mt-5">450 DSA Cracker</h1>
				{questionData.length === 0 ? (
					// load spinner until data is fetched from DB
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="success" />
					</div>
				) : (
					<>
						{/* HOME  ABOUT SETTINGS ROUTE */}
						<Route exact path="/" children={<TopicCard questionData={questionData}></TopicCard>} />
						<Route path="/about" children={<About></About>} />
						<Route
							path="/settings"
							children={
								<Settings
									resetData={resetData}
									exportData={exportData}
									importData={importData}
									dbQuestionData={questionData}
									updateData={updateData}
								></Settings>
							}
						/>

						{/* TOPIC ROUTE */}
						<Route path="/array" children={<Topic data={questionData[0]} updateData={updateData} />} />
						<Route path="/matrix" children={<Topic data={questionData[1]} updateData={updateData} />} />
						<Route path="/string" children={<Topic data={questionData[2]} updateData={updateData} />} />
						<Route path="/search_sort" children={<Topic data={questionData[3]} updateData={updateData} />} />
						<Route path="/linked_list" children={<Topic data={questionData[4]} updateData={updateData} />} />
						<Route path="/binary_trees" children={<Topic data={questionData[5]} updateData={updateData} />} />
						<Route path="/bst" children={<Topic data={questionData[6]} updateData={updateData} />} />
						<Route path="/greedy" children={<Topic data={questionData[7]} updateData={updateData} />} />
						<Route path="/backtracking" children={<Topic data={questionData[8]} updateData={updateData} />} />
						<Route
							path="/stacks_queues"
							children={<Topic data={questionData[9]} updateData={updateData} />}
						/>
						<Route path="/heap" children={<Topic data={questionData[10]} updateData={updateData} />} />
						<Route path="/graph" children={<Topic data={questionData[11]} updateData={updateData} />} />
						<Route path="/trie" children={<Topic data={questionData[12]} updateData={updateData} />} />
						<Route
							path="/dynamic_programming"
							children={<Topic data={questionData[13]} updateData={updateData} />}
						/>
						<Route
							path="/bit_manipulation"
							children={<Topic data={questionData[14]} updateData={updateData} />}
						/>
					</>
				)}
				<Footer pickRandom={pickRandom}></Footer>
			</div>
		</Router>
	);
}

export default App;
