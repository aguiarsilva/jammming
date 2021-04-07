import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: ['name', 'artist', 'album', 'id'],
                       playlistName: '',
                       playlistTracks: ['name', 'artist', 'album', 'id']
                     }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
            return;
        }
    }

    removeTrack(track) {
        this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
        this.setState = ({ playlistTracks: this.state.playlistTracks });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        const trackUri = this.state.playlistTracks.map(track => track.uri);
        //Update the method to call Spotify.savePlaylist()
        Spotify.savePlaylist(this.state.playlistName, trackUri);
        //Reset the state of playlist name to New Playlist and playlist tracks to an empty array
        this.setState({
            playlistName: 'New Playlist',
            playlistTracks: [],
        });
        document.querySelectorAll('input')[1].value='New Playlist';  
    }

    search(term) {
        Spotify.search(term).then(searchResults => this.setState({searchResults: searchResults}));
    }

    render() {
        return ( 
            <div>
            <h1> Ja < span className = "highlight" > mmm </span>ing</h1 >
            <div className = "App" >
                <SearchBar 
                onSearch={this.search} />
            <div className = "App-playlist" >
                <SearchResults searchResults={this.state.searchResults} 
                onAdd={this.addTrack} />
                <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
            </div> 
            </div> 
            </div>
        );
    }

}

export default App;