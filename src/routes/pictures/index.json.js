import errors from '@/utils/errorMessages.js';
import generatePictureList from '../../utils/generatePictureList';

const header = { 'Content-Type': 'application/json' };

export async function get(req, res) {
	const picturesBySeries = await generatePictureList('series');

	if (!picturesBySeries) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	res.writeHead(200, header);
	res.end(JSON.stringify(picturesBySeries));
}
