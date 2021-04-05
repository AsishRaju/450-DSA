import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import QuestionData from "../../450DSAFinal";
import Button from 'react-bootstrap/Button'
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container'
import { toast, ToastContainer } from "react-toastify";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fade from "react-reveal/Fade";
import "./Settings.css";


export default function Settings({ dbQuestionData, updateData, resetData, exportData, importData }) {
    const inputFile = useRef(null)
    let history = useHistory();
    const [importSpinnerState, setImportSpinnerState] = useState(false)
    const [exportSpinnerState, setExportSpinnerState] = useState(false)
    // About component takes resetData() from App <Component> to trigger DB data reset
    function handleChange(e) {
        setImportSpinnerState(true)
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const JSONData = JSON.parse(e.target.result)
            importData(JSONData, () => {
                setImportSpinnerState(false)
                history.push('/')
            })
        };
    }

    async function syncChanges() {
        let i = 0
        for await (let topic of dbQuestionData) {
            let dataFromJSON = QuestionData[i].questions
            let key = topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
            await topic.questions.forEach((qObj, index) => {
                if (qObj.Done) {
                    dataFromJSON[index]["Done"] = true;
                }
                if (qObj.Bookmark) {
                    dataFromJSON[index]["Bookmark"] = true
                } else {
                    dataFromJSON[index]["Bookmark"] = false
                }
            })
            await updateData(
                key,
                {
                    started: topic.started,
                    doneQuestions: topic.doneQuestions,
                    questions: dataFromJSON,
                },
                i
            );
            i++;
        }
        const Card = (
            <>
                <p className="text-center">New Data Synced 👍🏻</p>
                <p className="text-center toast-subtitle">Redirecting now...</p>
            </>
        );

        toast(Card, {
            position: "bottom-center",
            className: `toast-Done`,
            autoClose: 1000,
            closeButton: true,
            onClose: () => {
                // window.location.replace('http://localhost:3000');
                window.location.replace('https://450-dsa-git-test-asishraju.vercel.app/');
            }
        });
    }

    return (
        <>
            <div className="container-custom">
                <Fade duration={500}>
                    <div className="container my-5 text-center">

                        <Row>
                            <Col>
                                <Button variant="primary"
                                    block
                                    onClick={() => {
                                        inputFile.current.click();
                                    }}
                                ><strong >Import Progress <span role="img" aria-label="inbox-tray">📥</span></strong>{' '}
                                    <Spinner animation="border" variant="light" size="sm" style={importSpinnerState ? {} : { display: 'none' }} />
                                </Button>

                            </Col>
                            <Col>
                                <Button variant="warning"
                                    block
                                    onClick={() => {
                                        setExportSpinnerState(true)
                                        exportData(() => {
                                            setExportSpinnerState(false)
                                        });
                                    }}
                                ><strong >Export Progress <span role="img" aria-label="anticlockwise-arrows-button">🔼</span></strong></Button>
                            </Col>
                            <Col>
                                <Button variant="success" block onClick={syncChanges}><strong >Sync Data  <span role="img" aria-label="anticlockwise-arrows-button">🔄</span></strong></Button>
                            </Col>
                            <Col>
                                <Button variant="danger" block onClick={() => {
                                    if (window.confirm("Are you sure you want to reset the progress !")) {
                                        setExportSpinnerState(true)
                                        resetData();
                                    }
                                }} ><strong >Reset Progress <span role="img" aria-label="anticlockwise-arrows-button">🔄</span></strong>
                                    {' '}<Spinner animation="border" variant="light" size="sm" style={exportSpinnerState ? {} : { display: 'none' }} />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="container my-5">
                        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} accept=".json" onChange={handleChange} />
                    </div>
                </Fade>
                <ToastContainer style={{ height: "160px" }} />

            </div>
        </>
    );
}
