import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class CardPMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      verDescripcion:false,
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
    };
  }
  componentDidMount() {
    let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    let FavRecuperados = JSON.parse(FavoritosMovies)

    if (FavoritosMovies !== null) {

      if (FavRecuperados.includes(this.props.id)) {
        console.log("entre");

        this.setState({
          esFav: true
        })
        console.log(this.state.esFav);
      }
    }
  }
  VerDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  AgregarAFavorito(id) {
    let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    if (FavoritosMovies == null) {
      let ArrayFav = [id]
      let FavToString = JSON.stringify(ArrayFav)
      localStorage.setItem("FavoritosMovies", FavToString)
    } else {
      let FavRecuperados = JSON.parse(FavoritosMovies)
      FavRecuperados.push(id)
      let FavToString = JSON.stringify(FavRecuperados)
      localStorage.setItem("FavoritosMovies", FavToString)
    }
    this.setState({
      esFav: true
    })
  }

  BorrarFavorito(id){
    let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    let FavRecuperados = JSON.parse(FavoritosMovies)
    let a = FavRecuperados.filter(ids => ids !== id)
    let aToString = JSON.stringify(a)
    localStorage.setItem("FavoritosMovies", aToString)

    this.setState({
      esFav: false
    })
  }
  
  render() {
    return (
      <article className="single-card-playing">
        <img
          src={this.props.poster}
          className="card-img-top"
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.title}</h5>

          {this.state.verMas && (
            <p className="card-text">{this.props.overview}</p>
          )}
  
          <button
            onClick={() => this.VerDescripcion()}
            className="btn alert-primary"
          >
            {this.state.verDescripcion
              ? "Ocultar descripción"
              : "Ver descripción"}
          </button>

          {this.state.verDescripcion ? (<p className="card-descripcion">{this.props.overview}</p>) : null}
          <Link className="btn btn-primary" to={`/movieNow/${this.props.id}`} >
            Ir a detalle
          </Link>

          
          {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >✅ </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} >♥️</button>}
        </div>
      </article>
    );
  }

}

export default CardPMovies;
