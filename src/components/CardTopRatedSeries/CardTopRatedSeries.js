import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class CardTopRatedSeries extends Component {
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
        <img className="card-img-top"
          src={this.props.poster ? this.props.poster : "https://via.placeholder.com/500x750?text=Sin+imagen"}
          alt={this.props.title}
        />


        <div className="cardBody">
          <h5 className="card-title">{this.props.title}</h5>

          {this.state.verMas && <p className="card-text">{this.props.overview}</p>}

          <button onClick={this.toggleVerMas} className="btn alert-primary">
            {this.state.textoBoton}
          </button>

          <Link to={`/movie/${this.props.id}`} className="btn btn-primary" style={{ marginLeft: 8 }}>
            Ir a detalle
          </Link>

          <button
            className="btn alert-primary"
            onClick={() => this.props.borrando(this.props.id)}
          >
            ♥️
          </button>
        </div>
      </article>
    );
  }
}
export default CardTopRatedSeries;
