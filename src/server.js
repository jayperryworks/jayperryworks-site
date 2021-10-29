import dotenv from 'dotenv';
dotenv.config();

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, CAMPAIGN_MONITOR_TOKEN, CAMPAIGN_MONITOR_LIST_ID } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
      session: () => ({
        CAMPAIGN_MONITOR_TOKEN,
				CAMPAIGN_MONITOR_LIST_ID
      }),
    })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
