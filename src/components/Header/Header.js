import React,{Component} from "react";
import "./Header.css";
import LinkHeader from "../LinkHeader/LinkHeader";
import SearchForm from "../SearchForm/SearchForm";

export default class Header extends Component{
  render(){
  return (
    <React.Fragment>
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

    </nav>
      <div className="search-bar">
          <SearchForm
            query={this.props.query}
            tipo={this.props.tipo}
            handleChange={this.props.handleChange}
            handleTipo={this.props.handleTipo}
            handleSubmit={this.props.handleSubmit}
          />
        </div>
     </React.Fragment> 

  );
  }}

