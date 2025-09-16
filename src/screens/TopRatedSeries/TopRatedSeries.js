import React from "react";
import { Link } from "react-router-dom";
import TopRatedSeriesFetch from "../../components/TopRatedSeriesFetch/TopRatedSeriesFetch";

export default function Popular() {
  return (
    <div className="container">
      <h2 className="section-title">Top rated series</h2>
      <section className="row cards" id="movies">
        <TopRatedSeriesFetch/>
        
      </section>
    </div>
  );
}