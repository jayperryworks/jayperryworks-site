import { format } from 'date-fns';

export async function GET() {
	// prettier-ignore
	return new Response(
`/* Team */
Author and designer: Jay Perry
Contact: hi [at] jayperry.works
Mastodon: https://indieweb.social/@jayperry
Location: Baltimore, Maryland

/* Site */
Language: English
Last updated: ${format(new Date(), 'LLLL d, yyyy')}
Standards: HTML5, CSS3, Javascript, Web Components, Markdown, YAML
Tools: Astro, Node.js, Vite
`,
	);
}
