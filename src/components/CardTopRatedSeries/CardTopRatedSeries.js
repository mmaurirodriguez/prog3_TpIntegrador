import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class CardTopRatedSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      verDescripcion:false,
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

 VerDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

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
        <img className="card-img-top"
          src={this.props.poster}
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.title}</h5>

          {this.state.verMas ? <p className="card-text">{this.props.overview}</p> : null}

            <button onClick={() => this.VerDescripcion()}
              className="btn alert-primary"
            >
              {this.state.verDescripcion? "Ocultar descripción" : "Ver descripción"}
            </button>
            {this.state.verDescripcion ? (<p className="card-descripcion">{this.props.overview}</p>) : null}
 
          <Link className="btn btn-primary" to={`/serieTop/${this.props.id}`} >
            Ir al detalle
          </Link>

          
          {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >✅ </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} >♥️</button>}
        </div>
      </article>
    );
  }
}
export default CardTopRatedSeries;
