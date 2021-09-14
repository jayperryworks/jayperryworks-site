const fetch = require('node-fetch');
const fs = require('fs');
const repoID = 'jpw-api';
const restUrl = `https://${repoID}.cdn.prismic.io/api/v2`;
const graphqlUrl = `https://${repoID}.prismic.io/graphql`;
const resultsFileName = 'prismicIntrospectionResults';

fetch(`${restUrl}` )
	.then( response => response.json() )
	.then((data) => {

		const masterRef = data.refs.find((response) => response.id === 'master');
		if (! masterRef ) return;

		fetch( `${graphqlUrl}?query=%7B%20__schema%20%7B%20types%20%7B%20kind%20name%20possibleTypes%20%7B%20name%20%7D%20%7D%20%7D%20%7D`, {

			headers: {
				'prismic-ref': masterRef.ref,
			}

		})
		.then((result) => result.json())
		.then((result) => {

			try {

				// here we're filtering out any type information unrelated to unions or interfaces
				const filteredData = result.data.__schema.types.filter(
					type => type.possibleTypes !== null,
				);

				result.data.__schema.types = filteredData;

				writeFile( result.data );

			} catch (error) {
				console.log( error );
			}

	})

})
const writeFile = (data) => {

	fs.writeFileSync(`./${resultsFileName}.json`, JSON.stringify(data), error => {

		if (error) {

		  console.error('Error writing fragmentTypes file', error);

		} else {

		  console.log('Fragment types successfully extracted!');

		}

	});
}