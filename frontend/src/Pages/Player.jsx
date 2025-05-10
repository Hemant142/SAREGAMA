import React, { useState, useEffect, useRef } from "react";
import "./Player.css"; // Import your CSS file
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { PiArrowArcLeftDuotone } from "react-icons/pi";
import { PiArrowArcRightDuotone } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { ImPause2 } from "react-icons/im";
import { HiSpeakerWave } from "react-icons/hi2";
import axios from "axios";
import styled from "styled-components";
import { useLocation, useSearchParams } from "react-router-dom";
const Player = ({ index, songs }) => {
  // const [songs, setSongs] = useState(data);

  // const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(index);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1); // State to track volume (1 is full volume)
  const [isVolumeControlVisible, setVolumeControlVisible] = useState(false); // State to show/hide volume control pop-up
  const audioRef = useRef(null);
  const [SearchPrarams, setSeachParams] = useSearchParams();
  const location = useLocation();
  // console.log(index,"index")
  // console.log({currentSongIndex,songs})

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const playSong = () => {
    audioRef.current.src = songs[currentSongIndex].audio;

    audioRef.current.addEventListener("loadedmetadata", () => {
      audioRef.current.currentTime = currentPlaybackTime; // Set the current playback time
      setTotalDuration(audioRef.current.duration);
      audioRef.current.play().then(() => setIsPlaying(true));
    });
  };

  const stopSong = () => {
    if (audioRef.current && audioRef.current.pause) {
      audioRef.current.pause();
      setCurrentPlaybackTime(audioRef.current.currentTime);
      setIsPlaying(false);
    } else {
      console.error("Audio element or pause method is not available.");
    }
  };

  const updatePlaybackTime = () => {
    setCurrentPlaybackTime(audioRef.current.currentTime);
  };

  const onProgressChange = (e) => {
    const newTime = (e.target.value / 100) * totalDuration;
    setCurrentPlaybackTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const rewindSong = () => {
    const newTime = currentPlaybackTime - 10;
    if (newTime >= 0) {
      setCurrentPlaybackTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const fastForwardSong = () => {
    const newTime = currentPlaybackTime + 10;
    if (newTime <= totalDuration) {
      setCurrentPlaybackTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    // setIsPlaying(true)

    setCurrentSongIndex(index);
  }, [index]);

  useEffect(() => {
    if (isPlaying) {
      playSong();
    }
  }, [currentSongIndex]);

  useEffect(() => {
    return () => {
      stopSong();
    };
  }, []);

  const nextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentPlaybackTime(0);
      setIsPlaying(true);
    } else {
      setCurrentSongIndex(0);
      setCurrentPlaybackTime(0);
      // setIsPlaying(true);
    }
  };

  const previousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentPlaybackTime(0);
      setIsPlaying(true);
    } else {
      setCurrentSongIndex(songs.length - 1);
      setCurrentPlaybackTime(0);
      // setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <DIV className="song-container" style={{ marginTop: "20px" }}>
      {songs.length > 0 ? (
        <div className="topdiv">
          <div style={{ display: "flex" }}>
            <img
              src={songs[currentSongIndex].avatar}
              alt="Song Avatar"
              width={200}
              height={100}
              style={{ marginRight: "10px" }}
            />
            <h1 style={{ marginRight: "10px" }}>
              {songs[currentSongIndex].title}
            </h1>
            <audio
              id="audio"
              controls
              onTimeUpdate={updatePlaybackTime}
              onEnded={nextSong}
              ref={audioRef}
            />
          </div>
          <div className="button-container">
            <button className="nav-button" onClick={previousSong}>
              <BiSkipPrevious />
            </button>
            <button onClick={rewindSong} className="Arrow">
              <PiArrowArcLeftDuotone />
              10
            </button>
            {isPlaying ? (
              <button className="play-button" onClick={stopSong}>
                <ImPause2 />
              </button>
            ) : (
              <button className="play-button" onClick={playSong}>
                <FaPlay />
              </button>
            )}
            <button onClick={fastForwardSong}>
              <PiArrowArcRightDuotone />
              10
            </button>
            <button className="nav-button" onClick={nextSong}>
              <BiSkipNext />
            </button>
          </div>
          <div className="audio-Voulme">
            <div
              className={`volume ${
                isVolumeControlVisible ? "is-volume-control-visible" : ""
              }`}
            >
              <button
                className="volume-button"
                onClick={() => setVolumeControlVisible(true)} // Show volume control pop-up
              >
                <HiSpeakerWave />
              </button>
            </div>

            {/* Volume control pop-up */}
            <div className="volume-control-popup">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1>No Data</h1>
      )}
      <div className="progress-container">
        <span id="current-time">{formatTime(currentPlaybackTime)}</span>
        <input
          type="range"
          className="range"
          min="0"
          max="100"
          step="0.1"
          value={(currentPlaybackTime / totalDuration) * 100 || 0}
          onChange={onProgressChange}
        />
        <span id="duration">{formatTime(totalDuration)}</span>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(246, 0, 203, 1) 0%,
    rgba(0, 212, 255, 1) 100%,
    rgba(0, 234, 247, 1) 100%
  );
  padding: 0px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #0000009b;
  /* width: 98%;
    margin: auto; */

  .topdiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  h1 {
    font-size: 15px;
    margin-bottom: 10px;
    color: white;
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  .audio-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  button {
    /* background-color: black; */
    border: none;
    width: 50px;
    height: 50px;
    font-size: 18px;
    color: white;
    cursor: pointer;

    margin: 10px;
    /* display: flex; */
    flex-direction: column;
  }

  .heading-image {
    display: "flex";
  }
  .nav-button {
    font-size: 30px;
  }

  .time-length {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    margin: 0 auto;
    width: 200px;
  }

  #current-time,
  #duration {
    color: white;
  }

  .range {
    width: 100%;
    color: black;
  }

  audio {
    display: none;
  }

  .button-container {
    display: flex;
    align-items: center;
  }

  .audio-Voulme {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .volume-control-popup > input {
    width: 70px;
  }
  .volume-button {
    width: 0px;
    margin-right: 20px;
  }

  .volume {
    height: 43px;
  }
  .progress-container {
    display: flex;
  }
`;

export default Player;
