import React from "react";
import "./Header.css";
import LinkHeader from "../LinkHeader/LinkHeader";

export default function Header() {
  return (
    <nav className="header navbar">
      <div className="logo">Rincon del Cine</div>

      <ul className="nav-links">
        <LinkHeader to="/" text="Home" />
        <LinkHeader to="/popular" text="Popular Movies" />
        <LinkHeader to="/now-playing" text="Movies Now Playing" />
        <LinkHeader to="/favoritas" text="Favoritas" />
      </ul>

      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
        <button className="search-btn">Buscar</button>
      </div>
    </nav>

  );
}

