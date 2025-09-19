import React, { Component } from "react";
import CardTopRatedSeries from "../CardTopRatedSeries/CardTopRatedSeries";

class CardTopRatedSeriesFetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      nextUrl: 1,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { isHome } = this.props;

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=2e31cba5082e57ddf6d0739f9c58a8d7")
      .then((res) => res.json())
      .then((data) => {
        const movies = isHome ? data.results.filter((pelis, idx) => idx < 4) : data.results;
        this.setState({
          movies,
          nextUrl: isHome ? null : data.page + 1,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, error: String(error) });
      });
  }

  cargarMas() {
    if (!this.state.nextUrl) return;

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=2e31cba5082e57ddf6d0739f9c58a8d7&page=${this.state.nextUrl}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movies: this.state.movies.concat(data.results),
          nextUrl: data.page + 1,
        });
      })
      .catch((error) => console.log(error));
  }

  borrar = (id) => {
    const arrayNuevo = this.state.movies.filter((m) => m.id !== id);
    this.setState({ movies: arrayNuevo });
  };

  render() {
    const { isHome } = this.props;
    const { loading, nextUrl, movies } = this.state;

    if (loading) return <h3>Cargando series...</h3>;

    return (
      <div>
        <section className="row cards" id="movies">
          {movies.map((mv) => (
            <CardTopRatedSeries
              key={mv.id}
              id={mv.id}
              title={mv.name}
              poster={mv.poster_path ? `https://image.tmdb.org/t/p/w500${mv.poster_path}` : null}
              overview={mv.overview}
              borrando={() => this.borrar(mv.id)}
            />
          ))}
        </section>
        {isHome? null : (
            nextUrl
              ? <button onClick={() => this.cargarMas()}>Más series</button>
              : <p>No hay más series para mostrar.</p>
          )
        }

      </div>
    );
  }
}

export default CardTopRatedSeriesFetch;
