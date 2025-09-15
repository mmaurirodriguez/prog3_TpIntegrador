import React from "react";
import PMoviesFetch from "../../components/PMoviesFetch/PMoviesFetch";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h2 className="alert alert-primary">Popular movies this week</h2>
      <PMoviesFetch />
      <Link to="/popular" className="btn btn-primary mt-2">Ver más</Link>

      <h2 className="alert alert-primary mt-4">Movies now playing</h2>
      <AMoviesFetch />
      <Link to="/now-playing" className="btn btn-primary mt-2">Ver más</Link>
    </div>
  );
}
