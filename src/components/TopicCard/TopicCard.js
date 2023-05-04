import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

import "./topicCard.css";

export default function TopicCard({ questionData }) {
  const dark = useContext(ThemeContext);

  // This component takes all the topicsData(here questionData ) and renders a TopicCard Component

  // Utility func() to find the progress in percentage
  const findPercentage = (doneQuestions, totalQuestions) => {
    return Math.round((doneQuestions / totalQuestions) * 100);
  };

  let totalSolved = 0;
  let totalQuestions = 0;
  // Mapping questionData to topicCard array
  let topicCard = questionData.map((topic, index) => {
    let { topicName, doneQuestions, questions, started } = topic;
    let percentDone = findPercentage(doneQuestions, questions.length);
    let questionsRemainig = questions.length - doneQuestions;
    //adding solved questions of every topic to totalSolved
    totalSolved += doneQuestions;
    totalQuestions += questions.length;
    if (started) {
      return (
        <Fade duration={500 + index * 0.4} key={index}>
          <div className="col mb-4">
            <Link
              to={`/${topic.topicName
                .replace(/[^A-Z0-9]+/gi, "_")
                .toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                className={`mb-3 inprogress-card animate__slideInDown hvr-grow ${dark ? "darkCard" : ""
                  }`}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="topicName">
                        {topic.topicName}
                      </Card.Title>
                    </Col>
                    <Col>
                      <h4>
                        <Badge
                          pill
                          variant="success"
                          className="float-right"
                          style={{ fontWeight: "500", cursor: "pointer" }}
                        >
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
                  <ProgressBar
                    animated={percentDone === 100 ? false : true}
                    variant="success"
                    now={percentDone}
                  />
                </Card.Body>
              </Card>
            </Link>
          </div>
        </Fade>
      );
    } else {
      return (
        <Fade duration={500 + index * 50} key={index}>
          <div className="col mb-4">
            <Link
              to={`/${topic.topicName
                .replace(/[^A-Z0-9]+/gi, "_")
                .toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                className={`mb-3 notstarted-card hvr-grow ${dark ? "darkCard" : ""
                  }`}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="topicName">
                        {" "}
                        {topicName}{" "}
                      </Card.Title>
                    </Col>
                    <Col>
                      <h4>
                        <Badge
                          pill
                          variant="primary"
                          className="float-right"
                          style={{ fontWeight: "500", cursor: "pointer" }}
                        >
                          Start Now
                        </Badge>
                      </h4>
                    </Col>
                  </Row>
                  <Card.Text className="totalQuestion">
                    Total Questions {questions.length}
                  </Card.Text>
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


  const promotionTile = () => {
    return (
      <Fade duration={500 + 1 * 50} key={-1}>
        <div>
          <Link
            to={{ pathname: "https://bit.ly/419XxW9" }}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Card
              className={`mb-3 promotional-card  ${dark ? "darkCard" : ""
                }`}
            >
              <Card.Body style={{ padding: '12px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}>
                  <h4 className="promotional-heading">
                  Code your way to the top and win big in the 45 Day DSA Coding Challenge by CodeStudio!
                  </h4>
                  <h4 className="promotional-cta  hvr-grow">
                    <Badge
                      pill
                      variant="primary"
                      style={{ fontWeight: "700", cursor: "pointer", backgroundColor: "white", color:"black" }}
                    >
                      Start Now
                    </Badge>
                  </h4>
                </div>
                {/* <Row style={{ justifyContent: 'center' }}>
              </Row> */}
                {/* <Card.Text className="promotional-subtext">
              Level up your summer with our<br></br>
                <span style={{fontWeight:700}}>21 Days Beginner Coding Challenge</span>
                <br></br>
                for a solid foundation in coding
              </Card.Text> */}
              </Card.Body>
            </Card>
          </Link>
        </div>
      </Fade>
    )
  }

  // topicCard.splice(1, 0, promotionTile)

  return (
    <>
      <h3 className="app-heading2 text-center mb-3">
        Your Gateway to crack DSA{" "}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </h3>

      <h4 className="text-center mb-4">
        {totalSolved
          ? `Total Questions Solved : ${totalSolved} (${(
            (totalSolved / totalQuestions) *
            100
          ).toFixed(2)}% Done)`
          : "Start Solving"}
        <p className="percentDone container mt-1">
          {totalSolved ? (
            <ProgressBar
              animated={
                ((totalSolved / totalQuestions) * 100).toFixed(2) === "100"
                  ? false
                  : true
              }
              variant="success"
              now={((totalSolved / totalQuestions) * 100).toFixed(2)}
              style={{ margin: "0.2em 5em" }}
            />
          ) : null}
        </p>
      </h4>
      <div className="container container-custom">
        {promotionTile()}
        <div className="row row-cols-1 row-cols-md-3 mt-3 grids">
          {topicCard}
        </div>
      </div>
    </>
  );
}
