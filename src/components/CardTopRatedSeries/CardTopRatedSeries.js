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

    if (FavoritosSeries !== null) {
  const FavRecuperados = JSON.parse(FavoritosSeries);

  if (FavRecuperados.length > 0) {
    Promise.all(
      FavRecuperados.map(id =>
        fetch(`https://api.themoviedb.org/3/tv/${id}`).then(res => res.json())
      )
    )
      .then((array) => {
        this.setState({
          esFav: true,
          favsSeries: array
        });
      })
      .catch((err) => console.log("error al traer detalle", err));
  } else {
    this.setState({ esFav: false });
  }
} else {
  this.setState({ esFav: false });
}}

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


        {this.state.esFav ? <button className="btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >✅ </button> : <button className="btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} >♥️</button>}
      </div>
    </article>
  );
}

}
export default CardTopRatedSeries;
