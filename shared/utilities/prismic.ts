import * as prismic from '@prismicio/client';

const endpoint = import.meta.env.PRISMIC_REPOSITORY || process.env.PRISMIC_REPOSITORY;
const accessToken = import.meta.env.PRISMIC_TOKEN || process.env.PRISMIC_TOKEN;

export default prismic.createClient(
	prismic.getRepositoryEndpoint(endpoint),
	{ accessToken },
);
