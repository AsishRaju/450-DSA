import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./Topic.css";
import { event } from "react-ga";

let resize = window.innerWidth;
localStorage.setItem("width", resize);


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

	// updating states using useEffect with dependency  on `data` prop
	useEffect(() => {

		if (data !== undefined) {
			let doneQuestion = [];
			function addResize() {
				resize = (window.innerWidth);
				window.location.reload();
			}
			window.addEventListener('resize',addResize)
			let tableData = data.questions.map((question, index) => {
				if (question.Done) {
					doneQuestion.push(index);
				}
				/*
				|	Hidden properties `_is_selected` and `_search_text` are used to sort the table
				|	and search the table respectively. react-bootstrap-table does not allow sorting
				|	by selectRow by default, and requires plain text to perform searches.
				*/
				return {
					id: index,
					question: (
						<>
						<a href={question.URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "600" }}>
							{question.Problem}

							</a>
							<button onClick={shownotes} value={index}  style={{ height: "2em", float: "right" }}>
									🕮 add note
							</button>

							</>
					),
					_is_selected: question.Done,
					_search_text: question.Problem,
					quicknotes: (
						<div style={{wordWrap:"break-word"}}>
							{question.Notes}
						</div>
					)
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
			dataField: "_is_selected",
			text: "Is Selected",
			headerStyle: { fontSize: "20px" },
			hidden: true,
			sort: true,
		},
		{
			dataField: "_search_text",
			text: "Search Text",
			headerStyle: { fontSize: "20px" },
			hidden: true,
		},
		{
			dataField: "quicknotes",
			text: "Quick Notes",
			id:"test",
			headerStyle: { fontSize: "20px", width: "200px" },
			hidden:resize<992?true:false,

		}
	];
	const rowStyle = { fontSize: "20px" };
	const selectRow = {
		mode: "checkbox",
		style: { background: "#c8e6c9" },
		selected: select,
		onSelect: handleSelect,
		hideSelectAll: true
	};
	const sortMode = {
		dataField: "_is_selected",
		order: "asc",
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
	}

	// trigger an information message for user on select change
	function displayToast(isSelect, id) {
		const { type, icon, verb, dir } = {
			type: isSelect ? "Done" : "Incomplete",
			icon: isSelect ? "🎉" : "🙇🏻‍♂️",
			dir: isSelect ? "👇🏻" : "👆🏻",
		};

		const title = `Q-${id} Marked ${type} ${icon}`;
		const subTitle = `Question pushed to the ${dir} of the table.`;

		const Card = (
			<>
				<p>{title}</p>
				<p class="toast-subtitle">{subTitle}</p>
			</>
		);

		toast(Card, {
			className: `toast-${type}`,
			autoClose: 2000,
			closeButton: true,
		});
	}
	
	//Notes component
	const NoteSection = (props) => {
		let id = (localStorage.getItem("cid"));
		const [quickNotes, setQuickNotes] = useState("");
		const addnewnotes = (event) => {
				setQuickNotes(event.target.value)
			
		}
	
		const onadd = () => {
			let key = topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
			if (id != null || id!=undefined)
			{
				let que = (data.questions);
				que[id].Notes = quickNotes;
				updateData(
					key,
					{
						started: data.started,
						doneQuestions: data.doneQuestions,
						questions: que,
					},
					data.position
				);

				localStorage.clear();
			}

		}
	
		useEffect(onadd, []);
		return (
			<>
				<textarea maxLength="40" className="note-section" placeholder="your notes here" onChange={addnewnotes} >
			</textarea>
				<button className="note-exit" onClick={saveAndExitNotes}>Close</button>
				<button className="note-save" onClick={onadd}>Save</button>

			</>
		)
	}
	//function for closing notes
	function saveAndExitNotes() {
		document.getElementsByClassName("note-section")[0].style.display = "none";
		document.getElementsByClassName("note-exit")[0].style.display = "none";
		document.getElementsByClassName("note-save")[0].style.display = "none";

	}
	//funtion for taking notes
	function shownotes(e) {
		document.getElementsByClassName("note-section")[0].style.display = "block";
		document.getElementsByClassName("note-exit")[0].style.display = "block";
		document.getElementsByClassName("note-save")[0].style.display = "block";
		localStorage.setItem("cid", e.target.value);
		document.getElementsByClassName("note-section")[0].value = data.questions[e.target.value].Notes;


	}

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
							<div className="container container-custom" style={{ overflowAnchor: "none" }}>
								<Fade duration={600}>
									<BootstrapTable {...props.baseProps} selectRow={selectRow} sort={sortMode} />
								</Fade>
							</div>
						</div>
						)}
						
				</ToolkitProvider>
			)}
			<ToastContainer />
			<NoteSection/>

		</>
	);
}
