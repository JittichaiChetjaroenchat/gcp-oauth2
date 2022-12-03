import axios from 'axios';
import { google } from 'googleapis';
import { Credentials, OAuth2Client } from 'google-auth-library';

function createClient(clientId: string, clientSecret: string): OAuth2Client {
  return new google.auth.OAuth2(clientId, clientSecret);
}

async function getAuthUrl(client: OAuth2Client, redirectUri: string): Promise<string> {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    return client.generateAuthUrl({
        redirect_uri: redirectUri,
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    });
}

async function getAuthToken(client: OAuth2Client, code: string, redirectUri: string): Promise<Credentials> {
    const { tokens } = await client.getToken({ 
        code,
        client_id: client._clientId,
        redirect_uri: redirectUri
    });

    return tokens;
}

async function getAuthUser(id_token: string, access_token: string) {
    const user = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`,
        },
    }).then((res) => res.data)
    .catch((error) => {
        throw new Error(error.message);
    });

    return user;
}

export { createClient, getAuthUrl, getAuthToken, getAuthUser };