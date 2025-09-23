import React, { Component } from "react";
import CardTopRatedSeries from "../../components/CardTopRatedSeries/CardTopRatedSeries";
import BusquedaFiltrada from "../../components/BusquedaFiltrada/BusquedaFiltrada";

export default class TopRatedSeries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaTopRatedSeries: [],
      siguientePagina: 1,
      seriesFiltradas: []
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

    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listaTopRatedSeries: res.results,
          siguientePagina: this.state.siguientePagina + 1,
          seriesFiltradas: res.results
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
    fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${this.state.siguientePagina}`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          listaTopRatedSeries: this.state.listaTopRatedSeries.concat(res.results),
          siguientePagina: this.state.siguientePagina + 1,
          seriesFiltradas: this.state.seriesFiltradas.concat(res.results)
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <h2 className="section-title">TopRated series this week</h2>
        <div className="section-title">
          <BusquedaFiltrada
            buscar={(query) => {
              let filtradas = this.state.listaTopRatedSeries.filter((peli) => peli.original_name.toLowerCase().includes(query.toLowerCase()))
              this.setState({
                seriesFiltradas: filtradas
              })
            }
            }
          />
        </div>
        <section className="row cards" id="movies">
          {this.state.seriesFiltradas.length === 0 ? <h3>Cargando...</h3> :
            this.state.seriesFiltradas.map(peli =>
              <CardTopRatedSeries
                key={peli.id}
                id={peli.id}
                title={peli.original_name}
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