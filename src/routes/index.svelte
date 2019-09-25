<style lang="scss">
  @import 'config/scale.scss';

  $test: red;

	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
    color: $test;
		font-size: scale-type('alpha');
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success! test</h1>

<figure>
	<img alt='Borat' src='images/portrait.jpg'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
