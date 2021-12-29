import React, { Component,useState,useRef,useEffect,useCallback } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./room";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";

import {Grid,Button,ButtonGroup,Typography} from "@material-ui/core";
function RenderHome(){
    return(
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };
  
export default RenderHome;