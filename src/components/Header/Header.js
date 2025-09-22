import React,{Component} from "react";
import "./Header.css";
import LinkHeader from "../LinkHeader/LinkHeader";
import Busqueda from "../BusquedaFiltrada/BusquedaFiltrada";

export default class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      tipo: "movie", 
    };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleTipo = (tipo) => {
    this.setState({ 
      tipo });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query, tipo } = this.state;

    if (query.length === 0) {
  return;
}

    this.props.history.push(`/search/${tipo}?query=${query}`);
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
      {/* formulario de búsquedaaaaa */}
      <div className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder={`Buscar ${
              this.state.tipo === "movie" ? "películas" : "series"
            }...`}
            value={this.state.query}
            onChange={this.handleChange}
          />
           <button type="submit" className="search-btn">Buscar</button>

          <button type="button" className="tipo-btn" onClick={() => this.handleTipo("movie")}>
              Películas
          </button>
          <button type="button" className="tipo-btn" onClick={() => this.handleTipo("tv")}>
            Series
          </button>
        </form>
      </div>

     </React.Fragment> 

  );
  }}

