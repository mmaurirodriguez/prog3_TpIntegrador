import React from "react";
import PMoviesFetch from "../../components/PMoviesFetch/PMoviesFetch";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import PopularSeriesFetch from "../../components/PopularSeriesFetch/PopularSeriesFetch";
import TopRatedSeriesFetch from "../../components/TopRatedSeriesFetch/TopRatedSeriesFetch";
import { Link } from "react-router-dom";
import BusquedaFiltrada from "../../components/BusquedaFiltrada/BusquedaFiltrada";

export default function Home() {
  return (
    <React.Fragment>
    <div className="container">
      <h2 className="section-title">Popular movies this week</h2>
      <PMoviesFetch isHome={true} />
      <Link to="/PopularMovies" className="btn btn-primary mt-2">Ver más</Link>

     <h2 className="section-title">Movies Now Playing</h2>
      <AMoviesFetch isHome={true} />
      <Link to="/NowPlayingMovies" className="btn btn-primary mt-2">Ver más</Link>

    <h2 className="section-title">Popular series this week</h2>
      <PopularSeriesFetch isHome={true} />
      <Link to="/PopularSeries" className="btn btn-primary mt-2">Ver más</Link>

    <h2 className="section-title">Top rated series</h2>
      <TopRatedSeriesFetch isHome={true} />
      <Link to="/TopRatedSeries" className="btn btn-primary mt-2">Ver más</Link>
    </div>
    </React.Fragment>
  );
}
