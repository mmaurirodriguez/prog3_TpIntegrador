import React from "react";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import { Link } from "react-router-dom";
import "./NowPlaying.css"

export default function Nowplaying() {

  return (
    <div className="container">
      <h2 className="section-title">Movies now playing</h2>
      <section className="row cards" id="now-playing">
     <AMoviesFetch isHome = {false} />
      </section>
    </div>
  );
}