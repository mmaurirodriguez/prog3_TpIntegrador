import React from "react";
import PMoviesFetch from "../../components/PMoviesFetch/PMoviesFetch";
import { Link } from "react-router-dom";



export default function PopularMovies() {

  return (
    <div className="container">
      <h2 className="alert alert-primary">Popular movies this week</h2>
       <Link to="/popular" className="btn btn-primary">Ver más</Link>
      <section className="row cards" id="movies">
        <PMoviesFetch/>
        
      </section>
    </div>
  );
}
