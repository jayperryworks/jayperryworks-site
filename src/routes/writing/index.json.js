import generateWritingList from '../../utils/generateWritingList.js';

const list = JSON.stringify(generateWritingList('content/writing'));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(list);
}
