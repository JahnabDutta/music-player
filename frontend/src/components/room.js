import React, { Component, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";

function Room() {
  const [votesToSkip, setVotes] = useState(0);
  const [guestCanPause, setGuest] = useState(false);
  const [isHost, setHost] = useState(false);
  const { roomCode } = useParams();
  const nav = useNavigate();

  function getRoomDetails() {
    useEffect(() => {
      fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => response.json())
        .then((data) => {
          setVotes(data.votes_to_skip);
          setGuest(data.guest_can_pause);
          setHost(data.is_host);
        });
    });
  }
  function leaveButtonPressed() {
    nav("/");
  }
  getRoomDetails();

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

export default Room;
