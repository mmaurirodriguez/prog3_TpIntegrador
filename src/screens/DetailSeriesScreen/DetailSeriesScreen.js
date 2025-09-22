import React, { Component } from "react";
import DetailSeries from "../../components/DetailSeries/DetailSeries";


class DetailSeriesScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
          TextoBotonF: "Agregar a favoritos",
          esFav: false,
          datosTopRated: [],
          datosPopular: [],
          generos: []

        }
    }

    componentDidMount() {
    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
      }
    };

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=2e31cba5082e57ddf6d0739f9c58a8d7",options)
      .then(res=>res.json())
      .then(data => this.setState(
        {datosPopular: data.results}
      ))
      .catch(error => console.log(error));

    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=2e31cba5082e57ddf6d0739f9c58a8d7",options)
      .then(res=>res.json())
      .then(data => this.setState(
        {datosTopRated: data.results}
      ))
      .catch(error => console.log(error));

    
    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=2e31cba5082e57ddf6d0739f9c58a8d7&language=es-ES")
        .then(res => res.json())
        .then(data => this.setState({ generos: data.genres }))
        .catch(error => console.log(error));

  

    let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    let FavRecuperados = JSON.parse(FavoritosMovies)

    if (FavoritosMovies !== null) {

      if (FavRecuperados.includes(this.props.id)) {
        console.log("entre");

        this.setState({
          esFav: true
        })
        console.log(this.state.esFav);
      }
    }
  }

  render(){
    
    let id = Number(this.props.match.params.id);
    let topSerie = []
    let pSerie = []
    
    topSerie = this.state.datosTopRated.length > 0?
    this.state.datosTopRated.filter(series => series.id === id)
    : [];

    
    pSerie = this.state.datosPopular.length > 0?
    this.state.datosPopular.filter(series => series.id === id)
    : [];
    
    let serie = topSerie.length === 0? pSerie : topSerie;

    return(
      <React.Fragment>
            {serie.length === 0? <h3>Cargando...</h3>:
              <div className="detailCard">
                <DetailSeries
                  image = {serie[0].backdrop_path ? `https://image.tmdb.org/t/p/w500${serie[0].backdrop_path}` : ""}
                  title = {serie[0].name}
                  vote = {serie[0].vote_average}
                  release = {serie[0].first_air_date}
                  descripcion = {serie[0].overview}
                  genero = {serie[0].genre_ids}
                  generos = {this.state.generos}
                  />
              </div>
        }

      </React.Fragment>
    )
  }
    
}

export default DetailSeriesScreen;