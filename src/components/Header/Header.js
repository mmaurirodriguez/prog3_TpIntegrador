import React from "react";
import "./Header.css";
import LinkHeader from "../LinkHeader/LinkHeader";

export default function Header() {
  return (
    <nav className="header navbar">
      <div className="logo">Rincon del Cine</div>

      <ul className="nav-links">
        <LinkHeader to="/" text="Home" />
        <LinkHeader to="/PopularMovies" text="Popular Movies" />
        <LinkHeader to="/NowplayingMovies" text="Movies Now Playing" />
        <LinkHeader to="/PopularSeries" text="Popular Series" />
        <LinkHeader to="/TopRatedSeries" text="Top Rated Series" />
        <LinkHeader to="/favoritas" text="Favoritas" />
      </ul>

      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
        <button className="search-btn">Buscar</button>
      </div>
    </nav>

  );
}

