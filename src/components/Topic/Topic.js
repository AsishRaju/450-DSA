import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Topic({ data, updateData }) {
	const SearchBar = (props) => {
		const handleChange = (e) => {
			props.onSearch(e.target.value);
		};
		return (
			<div className="container container-custom2">
				<InputGroup className="mb-3">
					<FormControl
						className="text-center"
						placeholder="Search Question.. 🔍"
						aria-label="Search Question"
						aria-describedby="basic-addon2"
						onChange={handleChange}
					/>
				</InputGroup>
			</div>
		);
	};
	const [select, setSelected] = useState([]);
	const [questionsTableData, setQuestionsTableData] = useState([]);
	const [topicName, setTopicName] = useState("");
	let doneQuestion = [];
	useEffect(() => {
		if (data !== undefined) {
			let tableData = data.questions.map((question, index) => {
				if (question.Done) {
					doneQuestion.push(index);
				}
				return {
					id: index,
					question: (
						<a href={question.URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "600" }}>
							{question.Problem}
						</a>
					),
					question_text: question.Problem,
				};
			});
			setQuestionsTableData(tableData);
			setTopicName(data.topicName);
			setSelected(doneQuestion);
		}
	}, [data]);
	const columns = [
		{
			dataField: "id",
			text: "Q-Id",
			headerStyle: { width: "130px", fontSize: "20px" },
		},
		{
			dataField: "question",
			text: "Questions",
			headerStyle: { fontSize: "20px" },
		},
		{
			dataField: "question_text",
			text: "Questions",
			headerStyle: { fontSize: "20px" },
			hidden: true,
		},
	];
	const rowStyle = { fontSize: "20px" };
	const selectRow = {
		mode: "checkbox",
		style: { background: "#c8e6c9" },
		selected: select,
		onSelect: handleSelect,
	};

	function handleSelect(row, isSelect) {
		let key = topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
		let newDoneQuestion = [...select];
		let updatedQuestionsStatus = data.questions.map((question, index) => {
			if (row.id === index) {
				question.Done = isSelect;
				if (isSelect) {
					newDoneQuestion.push(row.id);
				} else {
					var pos = newDoneQuestion.indexOf(row.id);
					newDoneQuestion.splice(pos, 1);
				}
				return question;
			} else {
				return question;
			}
		});
		updateData(
			key,
			{
				started: newDoneQuestion.length > 0 ? true : false,
				doneQuestions: newDoneQuestion.length,
				questions: updatedQuestionsStatus,
			},
			data.position
		);
		setSelected([...newDoneQuestion]);
	}

	return (
		<>
			<h3 className="text-center mb-5">
				<Link to="/">Topics</Link>/{topicName}
			</h3>

			{data === undefined ? (
				<div className="d-flex justify-content-center">
					<Spinner animation="grow" variant="success" />
				</div>
			) : (
				<ToolkitProvider className="float-right" keyField="id" data={questionsTableData} columns={columns} rowStyle={rowStyle} search>
					{(props) => (
						<div>
							<SearchBar {...props.searchProps} />
							<div className="container container-custom">
								<Fade duration={600}>
									<BootstrapTable {...props.baseProps} selectRow={selectRow} />
								</Fade>
							</div>
						</div>
					)}
				</ToolkitProvider>
			)}
		</>
	);
}
