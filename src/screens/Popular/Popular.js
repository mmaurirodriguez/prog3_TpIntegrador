import React from "react";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import { Link } from "react-router-dom";

export default function Popular() {
  return (
    <div className="container">
      <h2 className="section-title">Movies popular</h2>
      <section className="row cards" id="now-playing">
     <PMoviesFetch/>
      </section>
    </div>
  );
}