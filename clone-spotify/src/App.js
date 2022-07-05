import React, { useEffect, useState } from "react";
import Login from './Login';
import './App.css';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player"; 
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  
  const [{user, token}, dispatch] = useDataLayerValue();
  useEffect(()=>{
     const hash = getTokenFromUrl();
     window.location.hash = "";
     let _token = hash.access_token;
     
     if(_token){ 
       spotify.setAccessToken(_token);
       
        
       dispatch({
        type:"SET_TOKEN",
        token: _token,
       })
      
       
      //spotify.setAccessToken(_token);
      //'37i9dQZF1E39ZQEnTETQ81'
      spotify.getPlaylist('70GgQKqZYXhgt796pwXPX1').then(response =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
      spotify.getMe().then(user =>{
        
        dispatch({
          type: 'SET_USER',
          user,
        });
      }); 

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
           playlists,
        });
      });
       
       
     }
  }, [token, dispatch]);

  

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
