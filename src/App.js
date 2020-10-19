import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import TopicCard from "./components/TopicCard/TopicCard";
import About from "./components/About/About";
import { getData, updateDBData } from "./services/dbServices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topic from "./components/Topic/Topic";

function App() {
	const [questionData, setquestionData] = useState([]);
	useEffect(() => {
		getData((QuestionData) => {
			setquestionData(QuestionData);
		});
	}, []);
	function updateData(key, topicData, topicPosition) {
		console.log(key, topicData, topicPosition);
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
	return (
		<Router>
			<div className="App">
				<h1 className="app-heading text-center mt-5">
					45
					<span role="img" aria-label="fire">
						0
					</span>{" "}
					DSA Cracker
				</h1>
				<Switch>
					<Route exact path="/" children={<TopicCard questionData={questionData}></TopicCard>} />
					<Route exact path="/about" children={<About></About>} />
					<Route path="/array" render={() => <Topic data={questionData[0]} updateData={updateData} />} />
					<Route path="/matrix" children={<Topic data={questionData[1]} updateData={updateData} />} />
					<Route path="/string" children={<Topic data={questionData[2]} updateData={updateData} />} />
					<Route path="/search_sort" children={<Topic data={questionData[3]} updateData={updateData} />} />
					<Route path="/linked_list" children={<Topic data={questionData[4]} updateData={updateData} />} />
					<Route path="/binary_trees" children={<Topic data={questionData[5]} updateData={updateData} />} />
					<Route path="/bst" children={<Topic data={questionData[6]} updateData={updateData} />} />
					<Route path="/greedy" children={<Topic data={questionData[7]} updateData={updateData} />} />
					<Route path="/stacks_queues" children={<Topic data={questionData[8]} updateData={updateData} />} />
					<Route path="/backtracking" children={<Topic data={questionData[9]} updateData={updateData} />} />
					<Route path="/heap" children={<Topic data={questionData[10]} updateData={updateData} />} />
					<Route path="/graph" children={<Topic data={questionData[11]} updateData={updateData} />} />
					<Route path="/trie" children={<Topic data={questionData[12]} updateData={updateData} />} />
					<Route path="/dynamic_programming" children={<Topic data={questionData[13]} updateData={updateData} />} />
					<Route path="/bit_manipulation" children={<Topic data={questionData[14]} updateData={updateData} />} />
				</Switch>
				<Footer></Footer>
			</div>
		</Router>
	);
}

export default App;
