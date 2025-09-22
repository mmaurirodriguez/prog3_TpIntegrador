import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardAMovies from "../../components/CardAMovies/CardAMovies";
import BusquedaFiltrada from "../../components/BusquedaFiltrada/BusquedaFiltrada";

export default class NowPlaying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaNowPlayingMovies: [],
      siguientePagina: 1,
      moviesFiltradas: []
    }

  }
  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listaNowPlayingMovies: res.results,
          siguientePagina: this.state.siguientePagina + 1,
          moviesFiltradas: res.results
        })
      })
      .catch(err => console.error(err));
  }

  cargarMas() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
      }
    };
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.state.siguientePagina}`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listaNowPlayingMovies: this.state.listaNowPlayingMovies.concat(res.results),
          siguientePagina: this.state.siguientePagina + 1,
          moviesFiltradas: this.state.moviesFiltradas.concat(res.results)
        })
      })
      .catch(err => console.error(err));
  }

  

  render() {
    return (
      <div className="container">
        <h2 className="section-title">NowPlaying movies this week</h2>
        <div className="section-title">
                  <BusquedaFiltrada
                    buscar = {(query) => {let filtradas = this.state.listaPopularMovies.filter((peli) => peli.title.toLowerCase().includes(query.toLowerCase()))
                      this.setState({
                        moviesFiltradas: filtradas
                      })
                    }
                  }
                />
                </div>
        <section className="row cards" id="movies">
          {this.state.moviesFiltradas.length == 0 ? <h3>Cargando...</h3> :
            this.state.moviesFiltradas.map(peli =>
              <CardAMovies
                key={peli.id}
                id={peli.id}
                title={peli.title}
                poster={peli.poster_path ? `https://image.tmdb.org/t/p/w500${peli.poster_path}` : ""}
                overview={peli.overview}
              />
            )}
        </section>
        <button className="botonCargarmas" onClick={() => this.cargarMas()}>Cargar mas</button>
      </div>
    );
  }
}