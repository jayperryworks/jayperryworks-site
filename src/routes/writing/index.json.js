import generatePostList from '../../utils/generatePostList.js';

const list = JSON.stringify(generatePostList('content/writing'));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(list);
}
