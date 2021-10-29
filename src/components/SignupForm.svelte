<script>

	async function getListTest () {
		const apiKey = process.env.CAMPAIGN_MONITOR_TOKEN;
		const listID = process.env.CAMPAIGN_MONITOR_LIST_ID;

		const request = {
			"EmailAddress": "subscriber@example.com",
			"Name": "New Subscriber",
			"Resubscribe": true,
			"RestartSubscriptionBasedAutoresponders": true,
			"ConsentToTrack":"Yes"
		};

		const response = await fetch(`https://api.createsend.com/api/v3.2/lists/${listID}.json`, {
			method: 'POST'
		});

		if (response.status !== 200) {
			this.error(response.status, data.message);
			return;
		}
		console.log(response.json());
	}

	getListTest();
</script>

<form class="js-cm-form" id="subForm" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="191722FC90141D02184CB1B62AB3DC26C77337A7609D430DF9E072373A1C86B95B49F8C39B0DB02DDC7587DD1E29E6F1B4C8A1DE72B89F44D3AEEF142A58ECBD">
	<label for="fieldEmail">Email</label>
	<input autocomplete="Email" aria-label="Email" class="js-cm-email-input qa-input-email" id="fieldEmail" maxlength="200" name="cm-yuuuult-yuuuult" required="" type="email">
	<button type="submit">Subscribe</button>
</form>
