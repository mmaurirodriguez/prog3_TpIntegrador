import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class CardTopRatedSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      textoBoton: "Ver descripción",
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
      favsSeries: []
    };
  }
  componentDidMount() {
    let FavoritosSeries = localStorage.getItem("FavoritosSeries")
    let FavRecuperados = JSON.parse(FavoritosSeries)
    console.log(FavRecuperados);

    if (FavoritosSeries !== null) {
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
  let FavoritosSeries = localStorage.getItem("FavoritosSeries")
  if (FavoritosSeries == null) {
    let ArrayFav = [id]
    let FavToString = JSON.stringify(ArrayFav)
    localStorage.setItem("FavoritosSeries", FavToString)
  } else {
    let FavRecuperados = JSON.parse(FavoritosSeries)
    FavRecuperados.push(id)
    let FavToString = JSON.stringify(FavRecuperados)
    localStorage.setItem("FavoritosSeries", FavToString)
  }
  this.setState({
    esFav: true
  })
}

BorrarFavorito(id) {
  let FavoritosSeries = localStorage.getItem("FavoritosSeries")
  let FavRecuperados = JSON.parse(FavoritosSeries)
  let a = FavRecuperados.filter(ids => ids !== id)
  let aToString = JSON.stringify(a)
  localStorage.setItem("FavoritosSeries", aToString)

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

          <button onClick={this.toggleVerMas} className="btn alert-primary">
            {this.state.textoBoton}
          </button>

          <Link className="btn btn-primary" to={`/movieNow/${this.props.id}`} >
            Ir a detalle
          </Link>

          
          {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >✅ </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} >♥️</button>}
        </div>
      </article>
    );
  }

}
export default CardTopRatedSeries;
