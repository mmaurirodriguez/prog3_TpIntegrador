import React from "react";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import { Link } from "react-router-dom";



export default function AirMovies() {

  return (
    <div className="container">
      <h2 className="alert alert-primary mt-4">Movies now playing</h2>
       <Link to="/now-playing" className="btn btn-primary">Ver más</Link>
      <section className="row cards" id="now-playing">
     <AMoviesFetch/>
      </section>
    </div>
  );
}
