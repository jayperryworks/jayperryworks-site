require('dotenv').config();

const fetch = require('node-fetch');
const fs = require('fs');

const repo = 'jpw-api';
const outFilePath = './src/utils/prismicFragments.json';
const token = process.env.PRISMIC_TOKEN;

let restUrl = `https://${repo}.cdn.prismic.io/api/v2`;
let graphqlUrl = `https://${repo}.cdn.prismic.io/graphql?query=%7B%20__schema%20%7B%20types%20%7B%20kind%20name%20possibleTypes%20%7B%20name%20%7D%20%7D%20%7D%20%7D`;

async function generateFragmentTypes() {
	const api = await fetch(`${restUrl}?access_token=${token}`)
		.then((result) => result.json());
   const ref = api.refs.find((r) => r.id === 'master');

  if (!ref) return;

  const headers = {
  	'prismic-ref': ref.ref,
  	'authorization': `Token ${token}`
  }

  const result = await fetch(graphqlUrl, { headers }).then(result => result.json());

  const filteredData = result.data.__schema.types.filter(
    (type) => type.possibleTypes !== null
  );

  result.data.__schema.types = filteredData;
  try {
    fs.writeFileSync(outFilePath, JSON.stringify(result.data, null, 2));
    console.log('Generate fragment types');
  } catch (error) {
    console.error('Error writing file', error);
  }
}

generateFragmentTypes();
