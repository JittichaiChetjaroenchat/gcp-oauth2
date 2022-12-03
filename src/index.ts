import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import * as config from './config';
import { createClient, getAuthUrl, getAuthToken, getAuthUser } from './libraries';

// Initial web server
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Prepare data
const oauth2client = createClient(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET);
const redirectUrl = new URL(path.join(config.GOOGLE_AUTHORIZED_URI), config.SERVER_DOMAIN).toString()

// Getting google oauth's url
app.get(config.GOOGLE_OAUTH_URI, async (req: Request, res: Response): Promise<void> => {
    const url = await getAuthUrl(oauth2client, redirectUrl);
    return res.redirect(url);
});

// Getting google authorized's url
app.get(config.GOOGLE_AUTHORIZED_URI, async (req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> => {
    const { code } = req.query;
    const authToken = await getAuthToken(oauth2client, code as string, redirectUrl);
    const authUser = await getAuthUser(authToken.id_token as string, authToken.access_token as string);

    return res.json(authUser);
});

// Start web server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});