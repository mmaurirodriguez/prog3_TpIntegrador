import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardPMovies from "../../components/CardPMovies/CardPMovies";

export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaPopularMovies: [],
      siguientePagina: 1
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

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listaPopularMovies: res.results,
          siguientePagina: this.state.siguientePagina + 1
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
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.siguientePagina}`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listaPopularMovies: this.state.listaPopularMovies.concat(res.results),
          siguientePagina: this.state.siguientePagina + 1
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <h2 className="section-title">Popular movies this week</h2>
        <section className="row cards" id="movies">
          {this.state.listaPopularMovies.length == 0 ? <h3>Cargando...</h3> :
            this.state.listaPopularMovies.map(peli =>
              <CardPMovies
                key={peli.id}
                id={peli.id}
                title={peli.title}
                poster={peli.poster_path ? `https://image.tmdb.org/t/p/w500${peli.poster_path}` : ""}
                overview={peli.overview}
              />
            )}
        </section>
        <button onClick={() => this.cargarMas()}>Cargar mas</button>
      </div>
    );
  }
}