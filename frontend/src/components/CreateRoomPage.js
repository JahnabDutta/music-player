import React, { Component } from "react";
import {Link} from 'react-router-dom';;
import {Button, Grid,Typography,TextField,FormHelperText,FormControl,Radio,RadioGroup,FormControlLabel} from "@material-ui/core/";

class CreateRoomPage extends React.Component {

    state= {
        guestCanPause:false,
        votesToSkip  :1
    }
    handleGuestCanPauseChange= (e) =>{
        const canPause = e.target.value === "true" ? true : false;
        this.setState({guestCanPause:canPause})
    }

    handleVotesChange = (e) =>{
        this.setState({votesToSkip:e.target.value})
    }

    handleRoomButtonPressed = () =>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              votes_to_skip: this.state.votesToSkip,
              guest_can_pause: this.state.guestCanPause,
            }),
          };
          fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) =>{history.pushState('room/'+data.code)});
    }


    render() {
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Typography component="h4" variant="h4">
                Create A Room
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <FormControl component="fieldset">
                <FormHelperText component="div">
                  <div align="center">Guest Control of Playback State</div>
                </FormHelperText>
                <RadioGroup
                  row
                  defaultValue="true"
                  onChange={this.handleGuestCanPauseChange}
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
                  onChange={this.handleVotesChange}
                  defaultValue={this.state.votesToSkip}
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
            <Grid item xs={12} align="center">
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleRoomButtonPressed}
              >
                Create A Room
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
              </Button>
            </Grid>
          </Grid>
        );
    }
}
 
export default CreateRoomPage;