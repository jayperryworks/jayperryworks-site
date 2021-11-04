<script>
	import { fade } from 'svelte/transition';
	import { stores } from '@sapper/app';
	import axios from 'axios';
	import validator from 'email-validator';
	import Button from '@/components/Button.svelte';
	import Wrapper from '@/components/Wrapper.svelte';

	// --- props
	let classes = ''
	export { classes as class };

	// --- stores
	// mailing list data is stored in environment variables
	// -> pull environment variables from session store
	// -> see server.js for session data config
	const { session } = stores();
	const {
		CAMPAIGN_MONITOR_TOKEN: apiKey,
		CAMPAIGN_MONITOR_LIST_ID: listID
	} = $session;

	// --- state
	let email = '';
	// unsent, error, success
	let status = 'unsent';
	let validationError = false;

	// --- config
	const endpoint = `https://api.createsend.com/api/v3.2/subscribers/${listID}.json`;
	const auth = {
		username: apiKey,
		password: 'x'
	};
	const transitionDuration = 250;

	async function addSubscriber () {
		// validate the input value before doing anything else
		if (!validator.validate(email)) {
			validationError = true;
			return;
		}

		const body = JSON.stringify({
			"EmailAddress": email,
			"Resubscribe": true,
			"RestartSubscriptionBasedAutoresponders": true,
			"ConsentToTrack":"No"
		});

		try {
			const response = await axios.post(endpoint, body, { auth, withCredentials: true });
			status = 'success';
		} catch(error) {
			if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log('No response received.');
				console.log(error.request);
			}

			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('Error in response:');
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}

			console.log('Config:');
			console.log(error.config);
			status = 'error';
		};
	}
</script>

{#if status === 'unsent'}
	<form
		action="https://www.createsend.com/t/subscribeerror?description="
		data-id="191722FC90141D02184CB1B62AB3DC26C77337A7609D430DF9E072373A1C86B95B49F8C39B0DB02DDC7587DD1E29E6F1B4C8A1DE72B89F44D3AEEF142A58ECBD"
		method="post"
		transition:fade="{{ duration: transitionDuration }}"
	>
		<label
			class="type-font-accent type-scale-epsilon type-weight-light"
			for="email"
		>
			Email
		</label>
		<div class="row">
			<input
				bind:value="{email}"
				class="type-scale-epsilon type-font-accent type-weight-light"
				aria-label="Email"
				autocomplete="Email"
				placeholder="name@domain.com"
				id="email"
				maxlength="200"
				name="cm-yuuuult-yuuuult"
				required
				type="email"
			>
			<Button
				on:click="{addSubscriber}"
				role="button"
				type="submit"
			>
				Subscribe
			</Button>
		</div>
		{#if validationError}
			<aside transition:fade>
				<p>Sorry, this doesn't look like a valid email address. Please double check and try again.</p>
			</aside>
		{/if}
	</form>
{/if}

{#if status === 'success'}
	<p transition:fade="{{ duration: transitionDuration, delay: transitionDuration }}">
		Yay it worked! You're totally subscribed!
	</p>
{/if}

{#if status === 'error'}
	<div transition:fade="{{ duration: transitionDuration, delay: transitionDuration }}">
		<h3>Oh dear, something went wrong.</h3>
		<p>Let's try this the old-fashioned way: please <a href="mailto:hi@jayperryworks.com">send me an email</a> with "Subscribe" as the subject line, and I'll sign you up. Sorry for the inconvenience.</p>
	</div>
{/if}

<style>
	form {
		--gutter: var(--space-xnarrow);
	}

	.row {
		margin-bottom: calc(var(--gutter) * -1);
	}

	input {
		background-color: var(--color-well);
		border-radius: 0.2em;
		border: 1px solid var(--color-primary);
		margin-bottom: var(--gutter);
		margin-right: var(--gutter);
		outline: 0;
		padding: 0.57em 1.2em;
		transition: all 0.25s ease-in-out;
		display: inline-block;
		min-width: 12rem;
	}

	input:focus {
		background-color: var(--color-bg);
		border-color: var(--color-highlight);
		/* box-shadow: none; */
		outline: 0;
	}

	label {
		display: block;
		margin-bottom: 0.5em;
		margin-bottom: var(--gutter);
	}

	input::placeholder {
		color: var(--color-secondary);
		opacity: 0.6;
		font-family: var(--type-font-accent);
		font-weight: light;
	}

	@supports (display: flex) {
		form {
			width: 100%;
		}

		.row {
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
		}

		.row input {
			flex: 1;
		}
	}
</style>
