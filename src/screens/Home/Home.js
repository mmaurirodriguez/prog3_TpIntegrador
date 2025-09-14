import React from "react";


export default function Home() {

  return (
    <div className="container">
      <h2 className="alert alert-primary">Popular movies this week</h2>
      <section className="row cards" id="movies">
       {/* otro componenete con pelis*/}
        
      </section>

      <h2 className="alert alert-primary mt-4">Movies now playing</h2>
      <section className="row cards" id="now-playing">
        {/* otro componenete con pelis*/}
      </section>

      <h2 className="alert alert-warning mt-4">Popular TV shows this week</h2>
      <section className="row cards" id="tv-show">
      
      </section>

      <h2 className="alert alert-warning mt-4">TV shows airing today</h2>
      <section className="row cards" id="on-air-today">
        {/* otro componenete con pelis*/}
      </section>
    </div>
  );
}
