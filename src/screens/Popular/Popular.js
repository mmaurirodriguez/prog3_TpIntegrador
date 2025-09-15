import React from "react";
import PMoviesFetch from "../../components/PMoviesFetch/PMoviesFetch";
import { Link } from "react-router-dom";

export default function Popular() {
  return (
    <div className="container">
      <h2 className="alert alert-primary">Popular movies this week</h2>
      <section className="row cards" id="movies">
        <PMoviesFetch/>
        
      </section>
    </div>
  );
}
