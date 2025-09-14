import React, { Component } from "react";
import CardAMovies from "../CardAMovies/CardAMovies";

//PADRE DE CARDAMOVIES!!!!!!
class AMoviesFetch extends Component {
    constructor(props) {
    super(props);
    this.state = {
      movies: [],
      nextUrl:null,
      loading: true,
      error: null,
    };
}   
    componentDidMount(){
        fetch(
            "https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=1"
        )
         .then((res) => res.json())
         .then((data) => {
            let nextUrl = null;
            //CREAMOS IF PARA IR AUMENTANDO LAS PAGINAS PERO QUE TAMPOCO SUPERE EL NRO D TOTOALPAGES!
             if (data.page < data.total_pages) {
                nextUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=${data.page + 1}`;
            }
            this.setState({
                movies: data.results,
                nextUrl: nextUrl ,   //aca funciona el IF
                loading: false
            });
        })
        .catch((e) => {
            console.log("Error:", e);
            this.setState({ loading: false, error: e.message });
    });
    }
cargarMas = () => {
  if (!this.state.nextUrl) return; // si no hay más páginas no hace nada ?? PREGUNTAR 

  fetch(this.state.nextUrl)
    .then((res) => res.json())
    .then((data) => {
      let nextUrl = null;

      // hcemos la misma logica que el IF de arribaa, preguntar si hay una forma mas sencilla
      if (data.page < data.total_pages) {
        nextUrl =`https://api.themoviedb.org/3/movie/now_playing?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&page=${data.page + 1}`;
            }

      this.setState({
        //para que usamos el concat --> nos va a ayuda a unir los dos arrays --> pagina 1 y 2 porque asi usamos el boton "cargar mas" en el futuro, y tmb nos ayuda a no repetir personajes que estan en la pagina anterior y por eso no ayuda a filtrar
        movies: this.state.movies.concat(data.results),
        nextUrl: nextUrl
      });
    })
    .catch((e) => console.log("Error:", e));
}
  borrar(id) {
    const arrayNuevo = this.state.movies.filter((m) => m.id !== id);
    this.setState({ movies: arrayNuevo });
  }
  render() {
    if (this.state.loading) return <h3>Cargando películas...</h3>;
//REVISAR SI LAS CLASSNAMES CORRESPONDEN CON EL INDEX.HTML!!!
    return (
      <div>
        <h2 className="alert alert-primary">Popular movies this week</h2>

        <section className="row cards" id="movies">
          {this.state.movies.map((mv) => (
            <CardAMovies
              key={mv.id}
              id={mv.id}
              title={mv.title}
              poster={mv.poster_path ? `https://image.tmdb.org/t/p/w500${mv.poster_path}` : ""}
              overview={mv.overview}
              borrando={() => this.borrar(mv.id)}
            />
          ))}
        </section>

        {this.state.nextUrl ? (
          <button onClick={this.cargarMas} style={{ marginTop: 16 }}>
            Más películas
          </button>
        ) : (
          <p style={{ marginTop: 16 }}>No hay más películas para mostrar.</p>
        )}
      </div>
    );
  }
}

export default AMoviesFetch;