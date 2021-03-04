import Localbase from "localbase";
import QuestionData from "../450DSAFinal";
let db = new Localbase("db");
db.config.debug = false

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
	db.collection("450dsaArchive").get().then((data) => {
		callback(data)
	})
}


export function importDBData(data, callback) {
	console.log('here')
	resetDBData((response) => {
		console.log(response)
		data.forEach((topic, index) => {
			console.log(topic, topic.topicName)
			db.collection("450dsaArchive").add(topic, topic.topicName)
			if (index == data.length - 1) {
				callback()
			}
		});
	})
}