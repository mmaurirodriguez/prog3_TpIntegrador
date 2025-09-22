import React,{Component} from "react";
import "./Header.css";
import LinkHeader from "../LinkHeader/LinkHeader";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      tipo: "" 
    };
  }

  handleChangeQuery(e){
    this.setState({ 
      query: e.target.value 
    });
  };


  handleChangeTipo(e){
    this.setState({ 
      tipo: e
    });
  };

  handleSubmit(e){
    e.preventDefault()
    this.props.history.push(`/results/${this.state.tipo}/${this.state.query}`)
  }



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
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input
            className="search-input"
            type="text"
            value={this.state.query}
            onChange={(e)=>this.handleChangeQuery(e)}
          />
           <button type="submit" className="search-btn">Buscar</button>

          <button type="button" className="tipo-btn" onClick={()=>this.handleChangeTipo('movie')}>
              Películas
          </button>
          <button type="button" className="tipo-btn" onClick={()=>this.handleChangeTipo('tv')}>
            Series
          </button>
        </form>
      </div>

     </React.Fragment> 

  );
  }}

  export default withRouter(Header);

