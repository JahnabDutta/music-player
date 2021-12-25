import React, { Component,useState,useEffect} from "react";
import {useParams} from "react-router-dom";



function Room() {
  const [votesToSkip,setVotes] = useState(0);
  const [guestCanPause,setGuest]=useState(false);
  const [isHost,setHost]= useState(false);
  const {roomCode} = useParams();

  function getRoomDetails(){
    useEffect(() => {
      fetch("/api/get-room" + "?code="+ roomCode)
      .then((response) => response.json())
      .then((data) =>{
        setVotes(data.votes_to_skip);
        setGuest(data.guest_can_pause);
        setHost(data.is_host);
      })
  })
  }

  getRoomDetails();
  
  return (<div>
    <div>code : {roomCode}</div>
    <div>votes : {votesToSkip}</div>
    <div>guest can pause : {guestCanPause.toString()}</div>
    <div>Host : {isHost.toString()}</div>
  </div>);
}

export default Room;