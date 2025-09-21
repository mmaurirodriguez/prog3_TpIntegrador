import React, { Component } from "react";
import DetailMovies from "../../components/DetailMovies/DetailMovies";

class DetailMoviesScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
          TextoBotonF: "Agregar a favoritos",
          esFav: false,
          datosNowPlaying: [],
          datosPopular: []

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
    {this.state.datosNowPlaying !== ''?
    aMovie = this.state.datosNowPlaying.filter(peliculas => peliculas.id === id): ''}  

    let pMovie = []
    {this.state.datosPopular !== ''?
    pMovie = this.state.datosPopular.filter(peliculas => peliculas.id === id): ''}  

    return(
      <React.Fragment>
            {this.state.datosNowPlaying ===''? <h3>Cargando...</h3>:
              <div className="detailCard">
                <DetailMovies
                  image = {aMovie[0].backdrop_path ? `https://image.tmdb.org/t/p/w500${aMovie[0].backdrop_path}` : ""}
                  title = {aMovie[0].title}
                  vote = {aMovie[0].vote_average}
                  release = {aMovie[0].release_date}
                  duracion = {aMovie[0].runtime}
                  descripcion = {aMovie[0].overview}
                  genero = {aMovie[0].genre_ids}
                  />
              </div>
        }

            {this.state.datos ===''? <h3>Cargando...</h3>:
              <div className="detailCard">
                <DetailMovies
                  image = {pMovie[0].backdrop_path ? `https://image.tmdb.org/t/p/w500${pMovie[0].backdrop_path}` : ""}
                  title = {pMovie[0].title}
                  vote = {pMovie[0].vote_average}
                  release = {pMovie[0].release_date}
                  duracion = {pMovie[0].runtime}
                  descripcion = {pMovie[0].overview}
                  genero = {pMovie[0].genre_ids}
                  />
              </div>
        }

        </React.Fragment>
    )
  }
    
}

export default DetailMoviesScreen;