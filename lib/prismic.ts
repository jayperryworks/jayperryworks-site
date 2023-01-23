import * as prismic from '@prismicio/client';

function getEnvString(key: string): string {
	if (import.meta.env[key]) {
		return import.meta.env[key].toString();
	}
	return process.env[key].toString();
}

const endpoint = getEnvString('PRISMIC_REPOSITORY');
const endpointUrl = prismic.getRepositoryEndpoint(endpoint);

const accessToken = getEnvString('PRISMIC_TOKEN');

export default prismic.createClient(endpointUrl, { accessToken });
