import dotenv from 'dotenv'
dotenv.config();

export const SERVER_DOMAIN = process.env.SERVER_DOMAIN || ''
export const GOOGLE_OAUTH_URI = process.env.GOOGLE_OAUTH_URI || ''
export const GOOGLE_AUTHORIZED_URI = process.env.GOOGLE_AUTHORIZED_URI || ''
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''