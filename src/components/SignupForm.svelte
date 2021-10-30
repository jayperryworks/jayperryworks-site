<script>
	import axios from 'axios';
	import { stores } from '@sapper/app';
	import { fade } from 'svelte/transition';

	let classes = ''
	export { classes as class };

	// mailing list data is stored in environment variables
	// -> pull environment variables from session store
	// -> see server.js for session data config
	const { session } = stores();
	const {
		CAMPAIGN_MONITOR_TOKEN: apiKey,
		CAMPAIGN_MONITOR_LIST_ID: listID
	} = $session;

	// unsent, error, success
	let status = 'unsent';
	let email = '';

	const fadeDuration = 250;

	async function addSubscriber () {
		const endpoint = `https://api.createsend.com/api/v3.2/subscribers/${listID}.json`;

		const auth = {
			username: apiKey,
			password: 'x'
		};

		const body = JSON.stringify({
			"EmailAddress": email,
			"Resubscribe": true,
			"RestartSubscriptionBasedAutoresponders": true,
			"ConsentToTrack":"Yes"
		});

		try {
			const response = await axios.post(endpoint, body, { auth, withCredentials: true });
			console.log('Success!');
			status = 'success';
		} catch(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('\nResponse:');
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log('\nNo response received.');
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}

			console.log('\nConfig:');
			console.log(error.config);
			status = 'error';
		};
	}
</script>

<div class="{classes}">
	{#if status==='unsent'}
		<form
			action="https://www.createsend.com/t/subscribeerror?description="
			data-id="191722FC90141D02184CB1B62AB3DC26C77337A7609D430DF9E072373A1C86B95B49F8C39B0DB02DDC7587DD1E29E6F1B4C8A1DE72B89F44D3AEEF142A58ECBD"
			method="post"
			transition:fade="{{ duration: fadeDuration }}"
		>
			<label for="email">Email</label>
			<input
				bind:value="{email}"
				aria-label="Email"
				autocomplete="Email"
				id="email"
				maxlength="200"
				name="cm-yuuuult-yuuuult"
				required
				type="email"
			>
			<button
				on:click|preventDefault="{addSubscriber}"
				type="submit"
			>
				Subscribe
			</button>
		</form>
	{/if}

	{#if status === 'success'}
		<p transition:fade="{{ duration: fadeDuration, delay: fadeDuration }}">
			Yay it worked! You're totally subscribed!
		</p>
	{/if}

	{#if status === 'error'}
		<div transition:fade="{{ duration: fadeDuration, delay: fadeDuration }}">
			<h3>Oh dear, this bicycle has gone rubber-side-up.</h3>
			<p>Let's try this the old-fashioned way: please <a href="mailto:hi@jayperryworks.com">send me an email</a> with "Subscribe" as the subject line, and I'll sign up you. Sorry for the inconvenience.</p>
		</div>
	{/if}
</div>
