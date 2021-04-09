const clientId = 'deea8a847df44d8daee632b383befc9a';
const redirectUri = 'http://playlistfacil.surge.sh';

let accessToken;

const Spotify = {
        getAccessToken() {
            if (accessToken) {
                return accessToken
            }

        //Checks for the accessToken Match and ExpiryDate match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiryDateCheck = window.location.href.match(/expires_in=([^&]*)/);

        //set the access token value and variable for expiration time - acces token should expire at the value of expiration time
        if (accessTokenMatch && expiryDateCheck) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiryDateCheck[1]);

            //Clear the parameters from the URL
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

        search(term) {
            const accessToken = Spotify.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}` };

            return fetch('https://api.spotify.com/v1/search?type=track&q=${term}', { headers: headers })
            .then(response => {
                return response.json()})
            .then(jsonResponse => {
                if(!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track =>({
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }));
            });
        },

        savePlaylist(playlistName, trackUri) {
            if(!playlistName || !trackUri.length) {
                return;
            }

            const accessToken = Spotify.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}` };
            let userId;

            return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json())
            .then(jsonResponse => {
                    userId = jsonResponse.id;
                    return fetch('https://api.spotify.com/v1/users/${user_id}/playlists', {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: playlistName}),
                    }).then(response => response.json())
                    .then(jsonResponse => {
                            const playlistId = jsonResponse.id;
                            return fetch('https://api.spotify.com//v1/users/${user_id}/playlists/${playlist_id}/tracks', {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({uris: trackUri}),
                            });
                        });
                });
        }
    };

    export default Spotify;