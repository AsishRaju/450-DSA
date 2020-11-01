import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import './Topic.css';

export default function Topic({ data, updateData }) {

	/*
	  This component takes data releted to a paticular topic 
	  and updateData() from App component
	*/

	/*
	  Setting state for fields that comes from `data` prop 
	  so that `data` prop is not undefined on reload
	*/
	const [select, setSelected] = useState([]);
	const [questionsTableData, setQuestionsTableData] = useState([]);
	const [topicName, setTopicName] = useState("");
	let doneQuestion = [];

	// updating states using useEffect with dependency  on `data` prop
	useEffect(() => {
		if (data !== undefined) {
			let tableData = data.questions.map((question, index) => {
				if (question.Done) {
					doneQuestion.push(index);
				}
				/*
					Search works on text only, since the table view contains hyperlinks search wont work
					this solved by a niche hack you can see this returns a obj containing 
					{id:..,question:...,question_text:...} so question is what is viewable in the app whereas
					question_text is hidden in the table config so search bar can now apply its search on 
					question_text which is present in data but not on view.
				*/
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

	// seacrh bar config
	const SearchBar = (props) => {
		const handleChange = (e) => {
			props.onSearch(e.target.value);
		};
		return (
			<div className="container container-custom2">
				<InputGroup className="mb-4">
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

	// table config
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

	// func() triggered when a question is marked done
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
		displayToast(isSelect, row.id);
	};

	// trigger an information message for user on select change
	function displayToast(isSelect, id) {
		const { type, icon, verb, dir } = {
			type: isSelect ? 'complete' : 'incomplete',
			icon: isSelect ? '👏🏻' : '🙇🏻‍♂️',
			verb: isSelect ? 'sent' : 'returned',
			dir: isSelect ? 'bottom' : 'top'
		};

		const title = `Question ${id} marked ${type} ${icon}`;
		const subTitle = `It has been ${verb} to the ${dir} of the table.`;

		const Card = (
			<>
				<p>{title}</p>
				<p class="toast-subtitle">{subTitle}</p>
			</>
		);
		
		toast(Card, {
			className: `toast-${type}`,
			autoClose: 2000,
			closeButton: false
		});
	};

	return (
		<>
			<h3 className="text-center mb-4">
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
			<ToastContainer />
		</>
	);
}
