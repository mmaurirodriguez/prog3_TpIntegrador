import React,{Component} from "react";
import "./DetailMovies.css";

class DetailMovies extends Component{
    constructor(props){
    super(props);
    this.state ={
      datos: '',
      favoritos:[],
      generos:[],
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=1")
      .then(res=>res.json())
      .then(data => this.setState(
        {datos: data.results}
      ))
      .catch(error => console.log(error));
      this.generos();

      let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    let FavRecuperados = JSON.parse(FavoritosMovies)

    if (FavoritosMovies !== null) {
      if (FavRecuperados.includes(this.props.id)) {
        this.setState({
          esFav: true
        })
      }
    }
  }


  AgregarAFavorito(id) {
    let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    if (FavoritosMovies == null) {
      let ArrayFav = [id]
      let FavToString = JSON.stringify(ArrayFav)
      localStorage.setItem("FavoritosMovies", FavToString)
    } else {
      let FavRecuperados = JSON.parse(FavoritosMovies)
      FavRecuperados.push(id)
      let FavToString = JSON.stringify(FavRecuperados)
      localStorage.setItem("FavoritosMovies", FavToString)
    }
    this.setState({
      esFav: true
    })
  }

  BorrarFavorito(id){
    let FavoritosMovies = localStorage.getItem("FavoritosMovies")
    let FavRecuperados = JSON.parse(FavoritosMovies)
    let a = FavRecuperados.filter(ids => ids !== id)
    let aToString = JSON.stringify(a)
    localStorage.setItem("FavoritosMovies", aToString)

    this.setState({
      esFav: false
    })
  }

  generos(){
  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES")
    .then(res => res.json())
    .then(data => this.setState({ generos: data.genres }))
    .catch(error => console.log(error));
}


render(){
    const id = Number(this.props.match.params.id);
    let aMovie = []
    if(this.state.datos !== ''){
    aMovie = this.state.datos.filter(peliculas => peliculas.id === id)
    }  

    if(!aMovie) return <div>Pelicula no encontrado...</div>
    return(
    <React.Fragment>
      {this.state.datos ==='' || aMovie.length === 0 ? <h3>Cargando...</h3>:
        <div className="detailCard">
          <img src={`https://image.tmdb.org/t/p/w500${aMovie[0].backdrop_path}`} alt={aMovie[0].title} />
              <h4>{aMovie[0].title}</h4>
              <p>{aMovie[0].vote_average}</p>
              <p>{aMovie[0].release_date}</p>
              <p>{aMovie[0].runtime}</p>
              <p>{aMovie[0].overview}</p>
              <p>{aMovie[0].genre_ids.map((id,i) => this.state.generos.filter(g => g.id === id).map(g => g.name)+(i < aMovie[0].genre_ids.length - 1? ", " : ""))}</p>
              {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >Eliminar de favoritos </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} > ⭐ Agregar a favoritos</button>}
        </div>
  }
    </React.Fragment>
    )
  }
}

export default DetailMovies;


