import * as prismic from '@prismicio/client';
import * as prismicHelpers from '@prismicio/helpers';

const endpoint: string = prismic.getRepositoryEndpoint('jpw-api');
const accessToken: string = import.meta.env.PRISMIC_TOKEN.toString();
const client = prismic.createClient(endpoint, { accessToken });

// export async function getByID(id: string) {
// 	return client.getByID(id);
// }
