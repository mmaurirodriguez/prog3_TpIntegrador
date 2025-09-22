import React, { Component } from "react";
import DetailMovies from "../../components/DetailMovies/DetailMovies";

class DetailMoviesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
      data: {}

    }
  }

  componentDidMount() {

    let id = Number(this.props.match.params.id);

    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(res => {console.log(res);
        this.setState({
          data: res
        })
      })
      .catch(err => console.error(err));

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

  render() {
    return (
      <React.Fragment>
        {this.state.data.length === 0 ? <h3>Cargando...</h3> :
          <div className="detailCard">
            <DetailMovies
              id={this.state.data.id}
              image={this.state.data.backdrop_path ? `https://image.tmdb.org/t/p/w500${this.state.data.backdrop_path}` : ""}
              title={this.state.data.title}
              vote={this.state.data.vote_average}
              release={this.state.data.release_date}
              duracion={this.state.data.runtime}
              descripcion={this.state.data.overview}
              genero={this.state.data.genres}
            />
          </div>
        }

      </React.Fragment>
    )
  }

}

export default DetailMoviesScreen;