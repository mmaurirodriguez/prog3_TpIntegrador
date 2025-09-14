import React, { Component } from "react";
//importar CSS

class CardPMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      textoBoton: "Ver descripción",
    };
  }

  toggleVerMas = () => {
    this.setState((prev) => ({
      verMas: !prev.verMas,
      textoBoton: prev.textoBoton === "Ver descripción" ? "Ocultar descripción" : "Ver descripción",
    }));
  };

  render() {
    return (
      <article className="single-card-movie">
        <img src={this.props.poster} alt={this.props.title} className="card-img-top" />
        <div className="cardBody">
          <h5 className="card-title">{this.props.title}</h5>

          {this.state.verMas && <p className="card-text">{this.props.overview}</p>}

          <button onClick={this.toggleVerMas} className="btn alert-primary">
            {this.state.textoBoton}
          </button>

          <a href={`/movie/${this.props.id}`} className="btn btn-primary" style={{ marginLeft: 8 }}>
            Ir a detalle
          </a>

          <button
            className="btn alert-primary"
            onClick={() => this.props.borrando && this.props.borrando(this.props.id)}
            style={{ marginLeft: 8 }}
          >
            🗑️
          </button>
        </div>
      </article>
    );
  }
}
export default CardPMovies;
