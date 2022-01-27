import errors from '@/utils/errorMessages.js';
import { queryAll } from '@/utils/prismicQuery.js';

const header = { 'Content-Type': 'application/json' };

export async function get (req, res) {
	// loop through pictures and clean up the data
	// so it's easier to work with on the client
	const listData = await queryAll({
		type: 'allPicture_seriess',
		fieldString: `
			title
			description
			_meta {
				uid
				id
			}
		`
	});

	if (!listData) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	const series = listData.map(({ node }) => {
		const { title, description, _meta } = node;
		const { uid, id } = _meta

		return {
			title: title?.[0]?.text,
			description: description?.[0]?.text,
			uid,
			id
		}
	});

	res.writeHead(200, header);
	res.end(JSON.stringify(series));
}
