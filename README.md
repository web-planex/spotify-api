## INSTALL

1. login to your mysql database and create new database.
2. In the file `config/config.json` update the value for the `username`, `password`, `database`, 'host' key according to your newly created mysql database.
3. Create a `.env` file in the root of the project.  The expected contents are in a later section.
4. Build the project: `npm i`
5. Create the database tables: `npm run migrate`

## RUNNING

1. Start the REST server:  npm run server
2. Test the queries with your favorite app (Postman, Curl, etc.)

## Database Manipulation

To restore the DB to it's blank state: `npm run migrate:undo`

## REST Endpoints

| path | method | query params | body params | 
|------|------- | ------------ | ----------- | 
| /track/add | POST | | ISRC (string)<br>idx<strong>*</strong> (int) | 
| /artist/search | GET | q (string) artist substring search term | |
| /artist/search/isrc | GET | q (string) an exact ISRC | |
| /artist/search/song | GET | q (string) song substring search term | |

&#42; *Spotify returns a track with an array of several items, idx is the index (0 to n-1) to be used.*

## The .env File
| Key      | Value |
| ----------- | ----------- |
| STORAGE      | Absolute path to a sqlite3 database file       |
| SPOTIFY_AUTH   | Basic \<base64 string\><br/> The base64 string should adhere to the requirements from the *Authorization Code Flow* section of the [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/), namely: `client_id:client_secret`|
| SPOTIFY_BASE_AUTH_URL | `https://accounts.spotify.com/` |
| SPOTIFY_BASE_URL | `https://api.spotify.com/` |
| SPOTIFY_TOKEN_ENDPOINT | `api/token` |
| SPOTIFY_SEARCH_ENDPOINT | `v1/search` |
| PORT | Defaults to `3001` or set to your choice |
