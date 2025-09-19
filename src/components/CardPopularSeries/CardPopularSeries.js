import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class CardPopularSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      textoBoton: "Ver descripción",
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
    };
  }
  componentDidMount() {
    let Favoritos = localStorage.getItem("Favoritos")
    let FavRecuperados = JSON.parse(Favoritos)
    console.log(FavRecuperados);

    if (Favoritos !== null) {
      console.log(FavRecuperados.includes(this.props.id));
      if (FavRecuperados.includes(this.props.id)) {
        console.log("entre");

        this.setState({
          esFav: true
        })
        console.log(this.state.esFav);
      }
    }
  }

  toggleVerMas = () => {
    this.setState((prev) => ({
      verMas: !prev.verMas,
      textoBoton:
        prev.textoBoton === "Ver descripción"
          ? "Ocultar descripción"
          : "Ver descripción",
    }));
  };

  AgregarAFavorito(id) {
    let Favoritos = localStorage.getItem("Favoritos")
    if (Favoritos == null) {
      let ArrayFav = [id]
      let FavToString = JSON.stringify(ArrayFav)
      localStorage.setItem("Favoritos", FavToString)
    } else {
      let FavRecuperados = JSON.parse(Favoritos)
      FavRecuperados.push(id)
      let FavToString = JSON.stringify(FavRecuperados)
      localStorage.setItem("Favoritos", FavToString)
    }
    this.setState({
      esFav: true
    })
  }

  BorrarFavorito(id){
    let Favoritos = localStorage.getItem("Favoritos")
    let FavRecuperados = JSON.parse(Favoritos)
    let a = FavRecuperados.filter(ids => ids !== id)
    let aToString = JSON.stringify(a)
    localStorage.setItem("Favoritos", aToString)

    this.setState({
      esFav: false
    })
  }
  
  render() {
    return (
      <article className="single-card-playing">
        <img
          src={this.props.poster}
          alt={this.props.title}
          className="card-img-top"
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.title}</h5>

          {this.state.verMas && (
            <p className="card-text">{this.props.overview}</p>
          )}

          <button onClick={this.toggleVerMas} className="btn alert-primary">
            {this.state.textoBoton}
          </button>

          <Link to={`/movieNow/${this.props.id}`}
            className="btn btn-primary">
            Ir a detalle
          </Link>

          
          {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >✅ </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} >♥️</button>}
        
        </div>
      </article>
    );
  }

}
export default CardPopularSeries;
