import React, { Component } from "react";
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

export default class HomePage extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<p>This is the homePage</p>}></Route>
          <Route path="join/" element={<RoomJoinPage />}></Route>
          <Route path="create/" element={<CreateRoomPage />}></Route>
          <Route path="room/:roomCode/" element ={ <Room />}></Route>
        </Routes>
      </Router>
    );
  }
}
