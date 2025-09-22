import React,{Component} from "react";
import "./Header.css";
import LinkHeader from "../LinkHeader/LinkHeader";
import Busqueda from "../BusquedaFiltrada/BusquedaFiltrada";

export default class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: "", 
    };
  }

  handleChange(e){
    this.setState({ 
      query: e.target.value 
    });
  };


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
        <form onSubmit={}>
          <input
            className="search-input"
            type="text"
            placeholder=
            value={this.state.query}
            onChange=
          />
           <button type="submit" className="search-btn">Buscar</button>

          <button type="button" className="tipo-btn" onClick={}>
              Películas
          </button>
          <button type="button" className="tipo-btn" onClick={}>
            Series
          </button>
        </form>
      </div>

     </React.Fragment> 

  );
  }}

