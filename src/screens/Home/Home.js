import React, { Component } from "react";
import { Link } from "react-router-dom";
import BusquedaFiltrada from "../../components/BusquedaFiltrada/BusquedaFiltrada";
import CardPMovies from "../../components/CardPMovies/CardPMovies";
import CardAMovies from "../../components/CardAMovies/CardAMovies";
import CardPopularSeries from "../../components/CardPopularSeries/CardPopularSeries";
import CardTopRatedSeries from "../../components/CardTopRatedSeries/CardTopRatedSeries";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaPopularMovies: [],
      listaNowPlayingMovies: [],
      listaPopularSeries: [],
      listaTopRatedSeries: []
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
        let peli = res.results.filter((peli, idx) => idx < 4)
        this.setState({
          listaPopularMovies: peli
        })
      })
      .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        let peli = res.results.filter((peli, idx) => idx < 4)
        this.setState({
          listaNowPlayingMovies: peli
        })
      })
      .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        let serie = res.results.filter((serie, idx) => idx < 4)
        this.setState({
          listaPopularSeries: serie
        })
      })

      .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        let serie = res.results.filter((serie, idx) => idx < 4)
        this.setState({
          listaTopRatedSeries: serie
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.listaNowPlayingMovies);
    return (
      <React.Fragment>
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
          <Link to="/PopularMovies" className="botonCargarmas">Ver más</Link>

          <h2 className="section-title">Movies Now Playing</h2>
          <section className="row cards" id="movies">
            {this.state.listaNowPlayingMovies.length == 0 ? <h3>Cargando...</h3> :
              this.state.listaNowPlayingMovies.map(peli =>
                <CardAMovies
                  key={peli.id}
                  id={peli.id}
                  title={peli.title}
                  poster={peli.poster_path ? `https://image.tmdb.org/t/p/w500${peli.poster_path}` : ""}
                  overview={peli.overview}
                />
              )}
          </section>
          <Link to="/NowPlayingMovies" className="botonCargarmas">Ver más</Link>

          <h2 className="section-title">Popular series this week</h2>
          <section className="row cards" id="movies">
            {this.state.listaPopularSeries.length == 0 ? <h3>Cargando...</h3> :
              this.state.listaPopularSeries.map(peli =>
                <CardPopularSeries
                  key={peli.id}
                  id={peli.id}
                  title={peli.original_name}
                  poster={peli.poster_path ? `https://image.tmdb.org/t/p/w500${peli.poster_path}` : ""}
                  overview={peli.overview}
                />
              )}
          </section>
          <Link to="/PopularSeries" className="botonCargarmas">Ver más</Link>

          <h2 className="section-title">Top rated series</h2>
          <section className="row cards" id="movies">
            {this.state.listaTopRatedSeries.length == 0 ? <h3>Cargando...</h3> :
              this.state.listaTopRatedSeries.map(peli =>
                <CardTopRatedSeries
                  key={peli.id}
                  id={peli.id}
                  title={peli.original_name}
                  poster={peli.poster_path ? `https://image.tmdb.org/t/p/w500${peli.poster_path}` : ""}
                  overview={peli.overview}
                />
              )}
          </section>
          <Link to="/TopRatedSeries" className="botonCargarmas">Ver más</Link>
        </div>
      </React.Fragment>
    );
  }
}
