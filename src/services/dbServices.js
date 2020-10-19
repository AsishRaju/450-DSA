import Localbase from "localbase";
import QuestionData from "../450DSAFinal";
let db = new Localbase("db");

export function insertData(callback) {
	QuestionData.forEach((topic, index) => {
		db.collection("450dsaArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	getData(callback);
}

export function getData(callback) {
	db.collection("450dsaArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				insertData(callback);
			} else {
				return callback(
					data.sort((a, b) => {
						return a.position - b.position;
					})
				);
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
