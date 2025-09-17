import React,{Component} from "react";
import "../DetailMovies/DetailMovies.css";

class DetailSeriesTop extends Component{
    constructor(props){
    super(props);
    this.state ={
      datos: '',
      favoritos:[],
      generos:[]
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=2e31cba5082e57ddf6d0739f9c58a8d7")
      .then(res=>res.json())
      .then(data => this.setState(
        {datos: data.results}
      ))
      .catch(error => console.log(error));
      this.generos();
  }

generos(){
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=2e31cba5082e57ddf6d0739f9c58a8d7&language=es-ES")
    .then(res => res.json())
    .then(data => this.setState({ generos: data.genres }))
    .catch(error => console.log(error));
}

agregarAFavoritos(serie){
  this.setState({
    favoritos: this.state.favoritos.concat(serie)
  })
}

render(){
    const id = Number(this.props.match.params.id);
    let aSerie = []
    if(this.state.datos !== ''){
    aSerie = this.state.datos.filter(series => series.id === id)
    }  

    if(!aSerie) return <div>Serie no encontrada...</div>
    return(
    <React.Fragment>
      {this.state.datos ==='' || aSerie.length === 0 ? <h3>Cargando...</h3>:
        <div className="detailCard">
          <img src={`https://image.tmdb.org/t/p/w500${aSerie[0].backdrop_path}`} alt={aSerie[0].name} />
              <h4>{aSerie[0].name}</h4>
              <p>{aSerie[0].vote_average}</p>
              <p>{aSerie[0].first_air_date}</p>
              <p>{aSerie[0].overview}</p>
              <p>{aSerie[0].genre_ids.map((id,i) => this.state.generos.filter(g => g.id === id).map(g => g.name)+(i < aSerie[0].genre_ids.length - 1? ", " : ""))}</p>
              <button onClick={()=>this.agregarAFavoritos(aSerie[0])} className="btn btn-primary"> ⭐ Agregar a favoritos</button>   
        </div>
  }
    </React.Fragment>
    )
  }
}

export default DetailSeriesTop;


