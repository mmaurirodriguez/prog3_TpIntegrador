import React, { Component } from "react";
import CardAMovies from "../../components/CardAMovies/CardAMovies";
import CardPMovies from "../../components/CardPMovies/CardPMovies";
import CardPopularSeries from "../../components/CardPopularSeries/CardPopularSeries";
import CardTopRatedSeries from "../../components/CardTopRatedSeries/CardTopRatedSeries";
import BusquedaFiltrada from "../../components/BusquedaFiltrada/BusquedaFiltrada";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default class ResultadosScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultadosSerie: [],
            resultadosMovie: [],
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

        
        let query = this.props.match.params.query
        let tipo = this.props.match.params.tipo

        if (tipo === "movie") {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        resultadosMovie: res.results
                    })
                })
                .catch(err => console.error(err));
        } else {
            fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`, options)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        resultadosSerie: res.results
                    })
                })
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
        <React.Fragment>
        <div className="container">
          <h2 className="section-title">Popular movies this week</h2>
          <section className="row cards" id="movies">
            {this.state.resultadosMovie.length == 0 ? <h3>Cargando...</h3> :
              this.state.resultadosMovie.filter(p => p.poster_path).map(peli =>  //filtramos para que no aparezcan las peliculas que no tienen los posters y de ahi mapeamos
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
            {this.state.resultadosMovie.length == 0 ? <h3>Cargando...</h3> :
              this.state.resultadosMovie.filter(p => p.poster_path).map(peli =>
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
            {this.state.resultadosSerie.length == 0 ? <h3>Cargando...</h3> :
              this.state.resultadosSerie.filter(s => s.poster_path).map(peli =>
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
            {this.state.resultadosSerie.length == 0 ? <h3>Cargando...</h3> :
              this.state.resultadosSerie.filter(s => s.poster_path).map(peli =>
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
        )
    }
}
