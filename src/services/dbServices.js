import Localbase from "localbase";
import QuestionData, { version } from "../450DSAFinal";
let db = new Localbase("db");
db.config.debug = false;
const localVersion = localStorage.getItem("450version");

export function insertData(callback) {
	QuestionData.forEach((topic, index) => {
		db.collection("450dsaArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	getData(callback);
}

// export function getData(callback) {
// 	db.collection("450dsaArchive")
// 		.get()
// 		.then((data) => {
// 			console.log(data);
// 			if (data.length === 0) {
// 				console.log("should not be here");
// 				insertData(callback);
// 			} else {
// 				return callback(
// 					data.sort((a, b) => {
// 						return a.position - b.position;
// 					})
// 				);
// 			}
// 		});
// }

export function getData(callback) {
	db.collection("450dsaArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				insertData(callback);
			} else {
				data.sort((a, b) => {
					return a.position - b.position;
				});
				if (localVersion === null) {
					localStorage.setItem("450version", 100000000);
					window.location.reload();
				} else if (parseInt(localVersion) !== version) {
					let i = 0;
					for (let topic of data) {
						let dataFromJSON = QuestionData[i].questions;
						let key = topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
						topic.questions.forEach((qObj, index) => {
							if (qObj.Done) {
								dataFromJSON[index]["Done"] = true;
							}
							if (qObj.hasOwnProperty("Bookmark")) {
								dataFromJSON[index]["Bookmark"] = qObj.Bookmark;
							} else {
								dataFromJSON[index]["Bookmark"] = false;
							}
							if (qObj.hasOwnProperty("Notes")) {
								dataFromJSON[index]["Notes"] = qObj.Notes;
							} else {
								dataFromJSON[index]["Notes"] = "";
							}
						});
						updateDBData(key, {
							started: topic.started,
							doneQuestions: topic.doneQuestions,
							questions: dataFromJSON,
						});
						i++;
					}
					localStorage.setItem("450version", version);
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} else {
					return callback(data);
				}
			}
		});
}

export function getTopicData(key, callback) {
	db.collection("450dsaArchive")
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function updateDBData(key, updateData) {
	db.collection("450dsaArchive").doc(key).update(updateData);
}

export function resetDBData(callback) {
	db.collection("450dsaArchive")
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else", error);
		});
}

export function exportDBData(callback) {
	db.collection("450dsaArchive")
		.get()
		.then((data) => {
			callback(data);
		});
}

export function importDBData(data, callback) {
	resetDBData((response) => {
		new Promise((resolve, reject) => {
			data.forEach((topic, index) => {
				console.log(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				db.collection("450dsaArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				if (index == data.length - 1) {
					resolve();
				}
			});
		}).then(() => {
			getData((data) => {
				callback(data);
			});
		});
	});
}
