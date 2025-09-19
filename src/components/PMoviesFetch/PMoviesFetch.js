import React, { Component } from "react";
import CardPMovies from "../CardPMovies/CardPMovies"

class PMoviesFetch extends Component {
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

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=1")
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
        this.setState({ loading: false, error: "Error cargando películas" });
      });
  }

  cargarMas() {
    if (!this.state.nextUrl) return;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=${this.state.nextUrl}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movies: this.state.movies.concat(data.results),
          nextUrl: data.page + 1,
        });
      })
      .catch((error) => console.log(error));
  }

  borrar(id) {
    const arrayNuevo = this.state.movies.filter((m) => m.id !== id);
    this.setState({ movies: arrayNuevo });
  };

  render() {
    const { loading, nextUrl, movies } = this.state;
    const { isHome } = this.props;

    if (loading) return <h3>Cargando películas...</h3>;

    return (
      <div>
        <section className="row cards" id="movies">
          {movies.map((mv) => (
            <CardPMovies
              key={mv.id}
              id={mv.id}
              title={mv.title}
              poster={mv.poster_path ? `https://image.tmdb.org/t/p/w500${mv.poster_path}` : ""}
              overview={mv.overview}
              borrando={() => this.borrar(mv.id)}
            />
          ))}
        </section>
        {isHome
          ? null
          : (
            nextUrl
              ? <button onClick={() => this.cargarMas()}>Más peliculas</button>
              : <p>No hay más series para mostrar.</p>
          )
        }

      </div>
    );
  }
}

export default PMoviesFetch;
