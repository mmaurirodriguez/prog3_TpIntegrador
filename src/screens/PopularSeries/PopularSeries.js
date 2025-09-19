import React from "react";
import { Link } from "react-router-dom";
import PopularSeriesFetch from "../../components/PopularSeriesFetch/PopularSeriesFetch";

export default function Popular() {
  return (
    <div className="container">
      <h2 className="section-title">Popular series this week</h2>
      <section className="row cards" id="movies">
        <PopularSeriesFetch isHome = {false}/>
        
      </section>
    </div>
  );
}