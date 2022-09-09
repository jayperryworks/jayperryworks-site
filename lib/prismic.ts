import * as prismic from '@prismicio/client';

const endpoint: string = prismic.getEndpoint('jpw-api');

const accessToken: string = import.meta.env.PRISMIC_TOKEN
	? import.meta.env.PRISMIC_TOKEN.toString()
	: process.env.PRISMIC_TOKEN.toString();

const client = prismic.createClient(endpoint, { accessToken });

export default client;
