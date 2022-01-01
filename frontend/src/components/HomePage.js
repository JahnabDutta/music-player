import React, { Component,useState,useRef,useEffect,useCallback } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./room";
import RenderHome from "./renderHome";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useParams,
  useNavigate,
} from "react-router-dom";

import {Grid,Button,ButtonGroup,Typography} from "@material-ui/core";

// export default class HomePage extends Component {
//   render() {
//     return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<p>This is the homePage</p>}></Route>
//           <Route path="join/" element={<RoomJoinPage />}></Route>
//           <Route path="create/" element={<CreateRoomPage />}></Route>
//           <Route path="room/:roomCode/" element ={ <Room />}></Route>
//         </Routes>
//       </Router>
//     );
//   }
// }

function Homepage() {
  const [roomCode, setRoomCode] = useState('')
  useEffect(() =>{
    async function fetchApi(){
      fetch('api/user-in-room')
      .then((response) =>response.json())
      .then((data) =>{
        setRoomCode(data.code);
      })
    }
    fetchApi();
  },[]);


  
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<RenderHome/>}></Route>
        <Route path="join/" element={<RoomJoinPage />}></Route>
        <Route path="create/" element={<CreateRoomPage />}></Route>
        <Route path="room/:roomCode/" element ={ <Room />}></Route>
      </Routes>
    </Router>
  );
}

export default Homepage;
