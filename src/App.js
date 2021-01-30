import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getData, updateDBData, resetDBData } from "./services/dbServices";
import Spinner from "react-bootstrap/Spinner";
import TopicCard from "./components/TopicCard/TopicCard";
import Topic from "./components/Topic/Topic";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import ReactGA from "react-ga";
import "./App.css";

function App() {

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
							{/* HOME AND ABOUT ROUTE */}
							<Route exact path="/" children={<TopicCard questionData={questionData}></TopicCard>} />
							<Route path="/about" children={<About resetData={resetData}></About>} />

							{/* TOPIC ROUTE */}
							{questionData.map((data) => {

                                let topicName = data.topicName
                                    .toLowerCase()
                                    .replace(/ & | /g, '_');

                                return <Route
                                    key={topicName} 
                                    path={`/${topicName}`}>
                                    <Topic
                                        data={data}
                                        updateData={updateData} />
                                </Route>
                            })}
						</>

					)}
				<Footer></Footer>
			</div>
		</Router>
	);
}

export default App;
