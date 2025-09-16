import React, { Component } from "react";
import CardAMovies from "../CardAMovies/CardAMovies";

//PADRE DE CARDAMOVIES!!!!!!
class AMoviesFetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      nextUrl: 1,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        let filtradas = data.results.filter((pelis, idx) => idx < 4); //fijarse para las otras paginas
        this.setState({
          movies: filtradas,
          nextUrl: data.page + 1,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  cargarMas() {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=${this.state.nextUrl}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movies: this.state.movies.concat(data.results),
          nextUrl: data.page + 1,
        });
      })
      .catch((error) => console.log(error));
  }

  borrar(id){
    const arrayNuevo = this.state.movies.filter((m) => m.id !== id);
    this.setState({
      movies: arrayNuevo,
    });
  };

  render() {
    if (this.state.loading) 
      return <h3>Cargando películas...</h3>;
    //REVISAR SI LAS CLASSNAMES CORRESPONDEN CON EL INDEX.HTML!!!
    return (
      <div>
        <section className="row cards" id="now-playing">
          {this.state.movies.map((mv) => (
            <CardAMovies
              key={mv.id}
              id={mv.id}
              title={mv.title}
              poster={
                mv.poster_path
                  ? `https://image.tmdb.org/t/p/w500${mv.poster_path}`
                  : ""}
              overview={mv.overview}
              borrando={() => this.borrar(mv.id)}
            />
          ))}
        </section>

      {this.state.movies.length > 4 
  ? (this.state.nextUrl 
      ? <button onClick={() => this.cargarMas()}>Más películas</button> 
      : <p>No hay más películas para mostrar.</p>
    )
  : null
}
      </div>
    );
  }
}

export default AMoviesFetch;
