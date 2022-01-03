import React, { Component, useState, useEffect,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./musicplayer";

const Room = () => {
  const [votesToSkip, setVotes] = useState(0);
  const [guestCanPause, setGuest] = useState(false);
  const [isHost, setHost] = useState(false);
  const { roomCode } = useParams();
  const [settings, setShowSettings] = useState(false);
  const nav = useNavigate();
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const [currentSong,setCurrentSong]  = useState({});
  function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVotes(data.votes_to_skip);
        setGuest(data.guest_can_pause);
        setHost(data.is_host);
      });
    if (isHost) {
      authenticateSpofify();
    }
  };
  getRoomDetails();

  function leaveButtonPressed() {
    nav("/");
  }

  function authenticateSpofify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSpotifyAuth(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }
  useEffect(() =>{
    const interval = setInterval(getCurrentSong,1000);

    return ()=>{
      clearInterval(interval);
    }
  },[]);
  function getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      }).then((data)=>{
        setCurrentSong(data);
        console.log(data.image_url);
      })
  }

  function updateShowSettings(value) {
    setShowSettings(value);
  }

  function RenderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallBack={() => {}}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }
  function RenderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  if (settings) {
    return <RenderSettings></RenderSettings>;
  } else {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <MusicPlayer {...currentSong}/>
          {isHost ? <RenderSettingsButton></RenderSettingsButton> : null}
          <Button
            variant="contained"
            color="secondary"
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Room;
