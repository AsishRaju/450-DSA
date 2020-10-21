import React from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import "./topicCard.css";

export default function TopicCard({ questionData }) {
	// This component takes all the topicsData(here questionData ) and renders a TopicCard Component

	// Utility func() to find the progress in percentage
	const findPercentage = (doneQuestions, totalQuestions) => {
		return Math.round((doneQuestions / totalQuestions) * 100);
	};

	// Mapping questionData to topicCard array
	let topicCard = questionData.map((topic, index) => {
		let { topicName, doneQuestions, questions, started } = topic;
		let percentDone = findPercentage(doneQuestions, questions.length);
		let questionsRemainig = questions.length - doneQuestions;
		if (started) {
			return (
				<Fade duration={500 + index * 0.4} key={index}>
					<div className="col mb-4">
						<Link to={`/${topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`} style={{ textDecoration: "none" }}>
							<Card className="mb-3 inprogress-card animate__slideInDown hvr-grow">
								<Card.Body>
									<Row>
										<Col>
											<Card.Title className="topicName">{topic.topicName}</Card.Title>
										</Col>
										<Col>
											<h4>
												<Badge pill variant="success" className="float-right" style={{ fontWeight: "500", cursor: "pointer" }}>
													{questionsRemainig === 0 ? "Done 👏🏻" : "Solve Now 🙇🏻‍♂️"}
												</Badge>
											</h4>
										</Col>
									</Row>
									<Card.Text className="totalQuestion">
										Total Questions {topic.questions.length} <br />
										{`${questionsRemainig}`} More to go
									</Card.Text>
									<p className="percentDone mb-1">
										<b>{percentDone}% Done</b>
									</p>
									<ProgressBar animated={percentDone === 100 ? false : true} variant="success" now={percentDone} />
								</Card.Body>
							</Card>
						</Link>
					</div>
				</Fade>
			);
		} else {
			return (
				<Fade duration={500 + index * 50} key={index}>
					<div className="col mb-4 ">
						<Link to={`/${topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`} style={{ textDecoration: "none" }}>
							<Card className="mb-3 notstarted-card hvr-grow">
								<Card.Body>
									<Row>
										<Col>
											<Card.Title className="topicName"> {topicName} </Card.Title>
										</Col>
										<Col>
											<h4>
												<Badge pill variant="primary" className="float-right" style={{ fontWeight: "500", cursor: "pointer" }}>
													Start Now
												</Badge>
											</h4>
										</Col>
									</Row>
									<Card.Text className="totalQuestion">Total Questions {questions.length}</Card.Text>
									<p className="percentDone mb-1">
										<b>
											<i>Not yet started</i>
										</b>
									</p>
								</Card.Body>
							</Card>
						</Link>
					</div>
				</Fade>
			);
		}
	});
	return (
		<>
			<h3 className="app-heading2 text-center mb-5">
				Your Gateway to crack DSA{" "}
				<span role="img" aria-label="fire">
					🔥
				</span>
			</h3>
			<div className="container container-custom">
				<div className="row row-cols-1 row-cols-md-3 mt-3 grids">{topicCard}</div>
			</div>
		</>
	);
}
