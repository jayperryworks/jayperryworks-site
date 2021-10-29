<script>
	import axios from 'axios';

	export let apiKey, listID;

	async function addSubscriber (email) {
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
			const response = await axios.post(endpoint, body, {
				auth,
				withCredentials: true
			});
			console.log('Success', response);
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
		};
	}

		addSubscriber('test@example.com');
</script>

<form class="js-cm-form" id="subForm" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="191722FC90141D02184CB1B62AB3DC26C77337A7609D430DF9E072373A1C86B95B49F8C39B0DB02DDC7587DD1E29E6F1B4C8A1DE72B89F44D3AEEF142A58ECBD">
	<label for="fieldEmail">Email</label>
	<input autocomplete="Email" aria-label="Email" class="js-cm-email-input qa-input-email" id="fieldEmail" maxlength="200" name="cm-yuuuult-yuuuult" required="" type="email">
	<button type="submit">Subscribe</button>
</form>
