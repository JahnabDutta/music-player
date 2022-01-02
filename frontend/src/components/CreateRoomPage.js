import React, { Component, useState, useEffect, useCallback,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@material-ui/core/";

import {Alert} from '@material-ui/lab';


const CreateRoomPage=(props)=> {
  const update = props.update;
  const roomCode = props.roomCode;
  const votesToSkip = useRef(1);
  const guestCanPause = useRef(false);
  const success = useRef(null);
  const navigate = useNavigate();
  if(typeof props.votesToSkip !== "undefined"){
    votesToSkip.current = props.votesToSkip;
    console.log(props.votesToSkip);
  }
  if(typeof props.guestCanPause !== "undefined"){
    guestCanPause.current = props.guestCanPause;
    console.log(props.guestCanPause);
  }

  const title =update ?  "Update Room" : "Create a room";

  function handleGuestCanPauseChange(e) {
    const canPause = e.target.value === "true" ? true : false;
    guestCanPause.current = canPause;
  }

  function handleVotesChange(e) {
    votesToSkip.current = e.target.value;
  }

  const handleRoomButtonPressed = useCallback(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip.current,
        guest_can_pause: guestCanPause.current,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate('/room/'+ data.code);
      });
  }, []);

  const handleUpdateButtonPressed = useCallback(() => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip.current,
        guest_can_pause: guestCanPause.current,
        code: props.roomCode,
      }),
    };

    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if(response.ok){
          success.current= true;
        }
        else{
          success.current = false;
        }
      });
    },[]);
  function RenderCreateButton(){
    return(<Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>);
  }

  function RenderUpdateButton(){
    return(<Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    </Grid>);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Grid item xs={12} align="center">
          <Collapse in ={success !== null}>
            {success ? "Updated":"Did not update"}
          </Collapse>
        </Grid>
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component="div">
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.current===true ? "true" : "false"}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip.current}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText component="div">
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {update ? <RenderUpdateButton></RenderUpdateButton>: <RenderCreateButton></RenderCreateButton>}
      </Grid>
      
  );
}

export default CreateRoomPage;
