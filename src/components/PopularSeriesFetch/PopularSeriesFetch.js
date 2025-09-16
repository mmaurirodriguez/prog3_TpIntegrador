import React, { Component } from "react";
import CardPopularSeries from "../CardPopularSeries/CardPopularSeries";

const API = "https://api.themoviedb.org/3";
const KEY = "2e31cba5082e57ddf6d0739f9c58a8d7";

class PopularSeriesFetch extends Component {
  state = {
    movies: [],
    nextPage: 1,
    totalPages: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchPage(1, true);
  }

  fetchPage = (page, initial = false) => {
    this.setState({ loading: initial ? true : false, error: null });

    fetch(`${API}/tv/popular?api_key=${KEY}&page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items = initial ? data.results.slice(0, 5) : data.results;
        this.setState((prev) => ({
          movies: initial ? items : prev.movies.concat(items),
          nextPage: data.page + 1,
          totalPages: data.total_pages,
          loading: false,
        }));
      })
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  };

  cargarMas = () => {
    const { nextPage, totalPages } = this.state;
    if (totalPages ? nextPage > totalPages : false) return;
    this.fetchPage(nextPage);
  };

  borrar = (id) => {
    this.setState((prev) => ({
      movies: prev.movies.filter((m) => m.id !== id),
    }));
  };

  render() {
    const { movies, loading, error, nextPage, totalPages } = this.state;

    return (
      <div>
        {loading ? (
          <h3>Cargando series...</h3>
        ) : error ? (
          <p>Ups, hubo un error: {error}</p>
        ) : (
          <>
            <section className="row cards" id="movies">
              {movies.length > 0 ? (
                movies.map((mv) => (
                  <CardPopularSeries
                    key={mv.id}
                    id={mv.id}
                    title={mv.name}
                    poster={mv.poster_path? `https://image.tmdb.org/t/p/w500${mv.poster_path}`: ""
                    }
                    overview={mv.overview}
                    borrando={() => this.borrar(mv.id)}
                  />
                ))
              ) : (
                <p>No hay series para mostrar.</p>
              )}
            </section>

            {totalPages ? (
              nextPage <= totalPages ? (
                <button onClick={this.cargarMas}>Más series</button>
              ) : (
                <p>No hay más series para mostrar.</p>
              )
            ) : (
              <p>No hay información de paginación.</p>
            )}
          </>
        )}
      </div>
    );
  }
}

export default PopularSeriesFetch;
