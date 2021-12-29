import React, {
  Component,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

function RoomJoinPage() {
  const roomCode = useRef("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  function handleTextFieldChange(e) {
    roomCode.current = e.target.value;
  }

  const roomButtonPressed = useCallback(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: roomCode.current }),
    };
    fetch("/api/join-room", requestOptions).then((response) => {
      if (response.ok) {
        navigate("/room/" + roomCode.current);
      } else {
        setError("Room not found");
      }
    });
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            label="Code"
            error= {error.length ==0 ? false:true}
            placeholder="Enter a Room Code"
            helperText={error}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;
