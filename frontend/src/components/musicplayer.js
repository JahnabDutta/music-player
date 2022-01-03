import React, { Component,useEffect,useCallback,useState,useRef } from 'react';

import {Grid,Typography,Card,IconButton,LinearProgress} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";


function MusicPlayer(props) {
    const songProgress = (props.time/props.duration)*100;
    return (
        <Card>
            <Grid container align= "center">
                <Grid item xs={4}>
                    <img src ={props.image_url}height="100%" width="100%"></img>
                </Grid>
                <Grid item xs={8}>
                    <Typography component="h4" variant="h5">{props.title}</Typography>
                    <Typography color="textSecondary" variant="subtitle1">{props.artist}</Typography>
                    <div>
                        <IconButton>
                            {props.is_playing ? <PauseIcon></PauseIcon> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon></SkipNextIcon>
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value = {songProgress}/>
        </Card>
    );
}

export default MusicPlayer;