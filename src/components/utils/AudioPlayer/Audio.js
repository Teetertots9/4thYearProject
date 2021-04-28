import React from "react";

import { Grid } from '@material-ui/core';

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

import './styles.css';

import useAudioPlayer from './useAudioPlayer';

function Audio({source, name, artist }) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <div className="App">
    <div className="player">
      <audio id="audio">
        <source src={source} />
      </audio>
      <Song songName={name} songArtist={artist}/>
      <div className="controls">
        {playing ? <Pause handleClick={() => setPlaying(false)} /> : <Play handleClick={() => setPlaying(true)} />}
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
    </div>
    </div>
  );
}

export default Audio;
