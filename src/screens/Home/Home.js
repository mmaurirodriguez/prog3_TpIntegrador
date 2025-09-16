import React from "react";
import PMoviesFetch from "../../components/PMoviesFetch/PMoviesFetch";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import PopularSeriesFetch from "../../components/PopularSeriesFetch/PopularSeriesFetch";
import TopRatedSeriesFetch from "../../components/TopRatedSeriesFetch/TopRatedSeriesFetch";
import { Link } from "react-router-dom";

export default function Home() {

  


  return (
    <div className="container">
      <h2 className="section-title">Popular movies this week</h2>
      <PMoviesFetch />
      <Link to="/PopularMovies" className="btn btn-primary mt-2">Ver más</Link>

     <h2 className="section-title">Movies Now Playing</h2>
      <AMoviesFetch />
      <Link to="/NowPlayingMovies" className="btn btn-primary mt-2">Ver más</Link>

    <h2 className="section-title">Popular series this week</h2>
      <PopularSeriesFetch />
      <Link to="/PopularSeries" className="btn btn-primary mt-2">Ver más</Link>

    <h2 className="section-title">Top rated series</h2>
      <TopRatedSeriesFetch />
      <Link to="/TopRatedSeries" className="btn btn-primary mt-2">Ver más</Link>
    </div>
  );
}
