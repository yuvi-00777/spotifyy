import React, {useEffect, useState} from 'react'
import { useDataLayerValue } from "./DataLayer";
import { MdOutlinePlayCircle} from "react-icons/md";
import {MdOutlineShuffle} from "react-icons/md";
import { MdOutlineSkipPrevious} from "react-icons/md";
import { MdOutlineSkipNext} from "react-icons/md";
import {MdOutlineReplay} from "react-icons/md";
import {MdOutlinePlaylistPlay} from "react-icons/md";
import {MdOutlineVolumeDown} from "react-icons/md";
import {MdPauseCircle} from "react-icons/md";
import "./Footer.css";

function Footer({spotify}) {
     
    const[{token, item ,playing}, dispatch] = useDataLayerValue();
    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
    
          dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
          });
    
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
      }, [spotify]);
    const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };

      const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      }; 
  
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className='footer__center'>
         <MdOutlineShuffle className="footer__green"/>
         <MdOutlineSkipPrevious onClick={skipNext} className="footer__icon"/>
         {playing ? (
          < MdPauseCircle
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          < MdOutlinePlayCircle
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
         <MdOutlineSkipNext onClick={skipPrevious} className="footer__icon"/>
         <MdOutlineReplay className="footer__green"/> 
      </div>
      <div className='footer__right'>
        <MdOutlinePlaylistPlay className="footer__playlist"/>
         <MdOutlineVolumeDown className="footer__playlist"/>
        </div>
    </div>
  )
}

export default Footer
