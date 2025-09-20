import React,{Component} from "react";
import PMoviesFetch from "../../components/PMoviesFetch/PMoviesFetch";
import AMoviesFetch from "../../components/AMoviesFetch/AMoviesFetch";
import PopularSeriesFetch from "../../components/PopularSeriesFetch/PopularSeriesFetch";
import TopRatedSeriesFetch from "../../components/TopRatedSeriesFetch/TopRatedSeriesFetch";
import { Link } from "react-router-dom";
import BusquedaFiltrada from "../../components/BusquedaFiltrada/BusquedaFiltrada";
import CardPMovies from "../../components/CardPMovies/CardPMovies";
import CardAMovies from "../../components/CardAMovies/CardAMovies";

export default  class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      listaPopularMovies: [],
      listaNowPlayingMovies:[]
    }
  }

componentDidMount(){
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => {console.log(res)
  let peli = res.results.filter((peli,idx) => idx < 4)
  this.setState({
    listaPopularMovies : peli
  })
})
  .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => {console.log(res.results)
  let peli = res.results.filter((peli,idx) => idx < 4)
  this.setState({
    listaNowPlayingMovies : peli
  })
  console.log(peli);
  console.log(this.state.listaNowPlayingMovies);
})
  .catch(err => console.error(err));


}

  render(){
    console.log(this.state.listaNowPlayingMovies);
    
  return(
    <React.Fragment>
    <div className="container">
      <h2 className="section-title">Popular movies this week</h2>
      <section className="row cards" id="movies">
      {this.state.listaPopularMovies.length == 0? <h3>Cargando...</h3>:
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
      <Link to="/PopularMovies" className="btn btn-primary mt-2">Ver más</Link>
     <h2 className="section-title">Movies Now Playing</h2>
     {this.state.listaNowPlayingMovies.length == 0? <h3>Cargando...</h3>:
      this.state.listaNowPlayingMovies.map(peli => 
        <CardAMovies
              key={peli.id}
              id={peli.id}
              title={peli.title}
              poster={peli.poster_path ? `https://image.tmdb.org/t/p/w500${peli.poster_path}` : ""}
              overview={peli.overview}
            />
      )}
      
      <Link to="/NowPlayingMovies" className="btn btn-primary mt-2">Ver más</Link>

    <h2 className="section-title">Popular series this week</h2>
      
      <Link to="/PopularSeries" className="btn btn-primary mt-2">Ver más</Link>

    <h2 className="section-title">Top rated series</h2>
      
      <Link to="/TopRatedSeries" className="btn btn-primary mt-2">Ver más</Link>
    </div>
    </React.Fragment>
  );
}
}
