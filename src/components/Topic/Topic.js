import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./Topic.css";

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
	const [showBookmark, setShowBookmark] = useState(false);

	// updating states using useEffect with dependency  on `data` prop
	useEffect(() => {
		if (data !== undefined) {
			getData(showBookmark)
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
					<InputGroup.Append>
						<Button variant="outline-success" onClick={() => {
							getData(!showBookmark)
						}} ><strong >Show Bookmarks <span role="img" aria-label="bookmark">🔖</span></strong></Button>
					</InputGroup.Append>
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
			dataField: "bookmark",
			// text: "Bookmark",
			headerStyle: { width: "100px", fontSize: "20px" },
			align: 'center'
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
	];
	const rowStyle = { fontSize: "20px" };
	const selectRow = {
		mode: "checkbox",
		style: { background: "#c8e6c9" },
		selected: select,
		onSelect: handleSelect,
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

	function handleBookMark(bookMarkIndex) {
		let key = topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
		let newDoneQuestion = [...select];
		let updatedQuestionsStatus = data.questions.map((question, index) => {
			if (bookMarkIndex === index) {
				question.Bookmark = !question.Bookmark;
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
	}

	function getData(showBookmark) {
		let doneQuestion = [];
		let tableData = []
		if (showBookmark) {
			let bookmarkedQuestions = data.questions.filter(obj => obj.Bookmark)
			if (bookmarkedQuestions.length > 0) {
				tableData = bookmarkedQuestions.map((question, index) => {
					if (question.Done) {
						doneQuestion.push(index);
					}
					if (question.Bookmark) {
						return {
							id: index,
							question: (
								<a href={question.URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "600" }}>
									{question.Problem}
								</a>
							),
							bookmark: (
								<div style={{ cursor: "pointer" }} onClick={() => {
									handleBookMark(index)
								}}>
									{question.Bookmark ?
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bookmark-check-fill text-success" viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
										</svg>
										:
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											className="bi bi-bookmark-check text-secondary"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
											/>
											<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
										</svg>
									}
								</div>
							),
							_is_selected: question.Done,
							_search_text: question.Problem,
						};
					} else {
						return
					}
				})
			}
			else {
				tableData = [{
					id: 0,
					question: (
						<p style={{ fontWeight: "600" }}>No Bookmarks Found !</p>
					),
					bookmark: (
						<p style={{ fontWeight: "600" }}>---</p>
					),
					_is_selected: false,
				}]
			}
		}
		else {
			tableData = data.questions.map((question, index) => {
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
						<a href={question.URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "600" }}>
							{question.Problem}
						</a>
					),
					bookmark: (
						<div style={{ cursor: "pointer" }} onClick={() => {
							handleBookMark(index)
						}}>
							{question.Bookmark ?
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bookmark-check-fill text-success" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
								</svg>
								:
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									className="bi bi-bookmark-check text-secondary"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
									/>
									<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
								</svg>
							}
						</div>
					),
					_is_selected: question.Done,
					_search_text: question.Problem,
				};
			});
		}
		setQuestionsTableData(tableData);
		setTopicName(data.topicName);
		setSelected(doneQuestion);
		setShowBookmark(showBookmark)

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
				<p className="toast-subtitle">{subTitle}</p>
			</>
		);

		toast(Card, {
			className: `toast-${type}`,
			autoClose: 2000,
			closeButton: true,
		});
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
				<ToolkitProvider
					className="float-right"
					keyField="id"
					data={questionsTableData}
					columns={columns}
					rowStyle={rowStyle}
					search
				>
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
		</>
	);
}
