import React,{Component} from "react";
import "./DetailMovies.css";


class DetailMovies extends Component{
    constructor(props){
    super(props);
    this.state ={
      datos: '',
      favoritos:[],
      generos:[]
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

  }

generos(){
  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES")
    .then(res => res.json())
    .then(data => this.setState({ generos: data.genres }))
    .catch(error => console.log(error));
}


agregarAFavoritos(pelicula){
  this.setState({
    favoritos: this.state.favoritos.concat(pelicula)
  })
}

render(){

    const id = Number(this.props.match.params.id);

    let aMovie = []

    if(this.state.datos != ''){
    aMovie = this.state.datos.filter(peliculas => peliculas.id === id)
    }  

    if(!aMovie) return <div>Personaje no encontrado...</div>

    return(
    <React.Fragment>
      {this.state.datos ==='' || aMovie.length === 0 ? <h3>Cargando...</h3>:
        <div className="detailCard">
          <img src={`https://image.tmdb.org/t/p/w500${aMovie[0].poster_path}`} alt={aMovie[0].title} />
              <h4>{aMovie[0].title}</h4>
              <p>{aMovie[0].vote_average}</p>
              <p>{aMovie[0].release_date}</p>
              <p>{aMovie[0].runtime}</p>
              <p>{aMovie[0].overview}</p>
              <p>{aMovie[0].genre_ids.map((id,i) => this.state.generos.filter(g => g.id === id).map(g => g.name)+(i < aMovie[0].genre_ids.length - 1? ", " : ""))}</p>
              <button onClick={()=>this.agregarAFavoritos(aMovie[0])} className="btn btn-primary"> ⭐ Agregar a favoritos</button>   
        </div>
  }
    </React.Fragment>
    )
  }
}

export default DetailMovies;


