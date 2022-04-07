#!/usr/bin/env node
// From https://github.com/madeleineostoja/prismic-apollo-introspect
// with reference to https://github.com/prismicio/apollo-link-prismic/issues/10

import fetch from 'node-fetch';
import { program } from 'commander';
import symbols from 'log-symbols';
import fs from 'fs';

program
  .option('-r, --repo <repoId>', 'prismic repository ID')
  .option('-o, --out <path>', 'Path to output file')
  .option('-t, --token <accessToken>', 'Path to text file with your access token')
  .parse();

const { repo, out, token } = program.opts();

let prismicApi = `https://${repo}.cdn.prismic.io/api`,
  fragmentsQuery = `https://${repo}.cdn.prismic.io/graphql?query=%7B%20__schema%20%7B%20types%20%7B%20kind%20name%20possibleTypes%20%7B%20name%20%7D%20%7D%20%7D%20%7D`,
  headers = {};

if (token) {
  const tokenString = fs.readFileSync(token, 'utf-8');
  prismicApi += `?access_token=${tokenString}`;
  headers['authorization'] = `Token ${tokenString}`;
}

async function generateFragmentTypes() {
  const api = await fetch(prismicApi).then((result) => result.json()),
    ref = api.refs.find((r) => r.id === 'master');

  if (!ref) {
    return;
  }

  headers['prismic-ref'] = ref.ref;

  const result = await fetch(fragmentsQuery, headers).then(
    (result) => result.json()
  );

  const filteredData = result.data.__schema.types.filter(
    (type) => type.possibleTypes !== null
  );

  result.data.__schema.types = filteredData;
  try {
    fs.writeFileSync(out, JSON.stringify(result.data, null, 2));
    console.log(symbols.success, 'Generate fragment types');
  } catch (err) {
    console.error(symbols.error, 'Error writing file', err);
  }
}

generateFragmentTypes();
