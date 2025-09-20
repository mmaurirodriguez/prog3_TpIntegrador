import React from "react";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import { Link } from "react-router-dom";

export default function Popular() {
  return (
    <div className="container">
<<<<<<< HEAD
      <h2 className="section-title">Movies popular</h2>
      <section className="row cards" id="now-playing">
     <PMoviesFetch/>
=======
      <h2 className="section-title">Popular movies this week</h2>
      <section className="row cards" id="movies">
        <PMoviesFetch isHome={false} />
        
>>>>>>> 5e624a0ef8e37d1c184f8061625245869f451872
      </section>
    </div>
  );
}