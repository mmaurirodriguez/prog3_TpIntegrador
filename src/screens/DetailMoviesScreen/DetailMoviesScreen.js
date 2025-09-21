import React, { Component } from "react";
import DetailMovies from "../../components/DetailMovies/DetailMovies";

class DetailMoviesScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
          TextoBotonF: "Agregar a favoritos",
          esFav: false,
          datosNowPlaying: [],
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

    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=1",options)
      .then(res=>res.json())
      .then(data => this.setState(
        {datosNowPlaying: data.results}
      ))
      .catch(error => console.log(error));

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=1",options)
      .then(res=>res.json())
      .then(data => this.setState(
        {datosPopular: data.results}
      ))
      .catch(error => console.log(error));

    
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES")
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
    let aMovie = []
    let pMovie = []
    
    aMovie = this.state.datosNowPlaying.length > 0?
    this.state.datosNowPlaying.filter(peliculas => peliculas.id === id)
    : [];

    
    pMovie = this.state.datosPopular.length > 0?
    this.state.datosPopular.filter(peliculas => peliculas.id === id)
    : [];
    
    let movie = aMovie.length === ''? pMovie : aMovie;

    return(
      <React.Fragment>
            {movie.length === 0? <h3>Cargando...</h3>:
              <div className="detailCard">
                <DetailMovies
                  image = {movie[0].backdrop_path ? `https://image.tmdb.org/t/p/w500${movie[0].backdrop_path}` : ""}
                  title = {movie[0].title}
                  vote = {movie[0].vote_average}
                  release = {movie[0].release_date}
                  duracion = {movie[0].runtime}
                  descripcion = {movie[0].overview}
                  genero = {movie[0].genre_ids}
                  generos = {this.state.generos}
                  />
              </div>
        }

      </React.Fragment>
    )
  }
    
}

export default DetailMoviesScreen;