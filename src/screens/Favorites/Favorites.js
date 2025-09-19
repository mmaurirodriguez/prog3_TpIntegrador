import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CarPMovies from "../../components/CardPMovies/CardPMovies";
import CardPopularSeries from "../../components/CardPopularSeries/CardPopularSeries";

class Favoritos extends Component {
    constructor() {
        super()
        this.state = {
            ListadePeliculas: [],
            ListadeSeries: []
        }
    }
    componentDidMount() {
        let FavoritosMovies = localStorage.getItem("FavoritosMovies")
        let FavoritosSeries = localStorage.getItem("FavoritosSeries")

        let FavoritosMoviesArray = JSON.parse(FavoritosMovies)
        let FavoritosSeriesArray = JSON.parse(FavoritosSeries)

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
            }
        };
        let FavoritosMoviesLista = []
        FavoritosMoviesArray.map(ids => {
            fetch(`https://api.themoviedb.org/3/movie/${ids}?language=en-US`, options)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    FavoritosMoviesLista.push(res)
                    this.setState({
                        ListadePeliculas: FavoritosMoviesLista
                    })
                })
                .catch(err => console.error(err));
        })

        let FavoritosSeriesLista = []
        FavoritosSeriesArray.map(ids => {
            fetch('https://api.themoviedb.org/3/tv/series_id?language=en-US', options)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    FavoritosSeriesLista.push(res)
                    this.setState({
                        ListadeSeries: FavoritosSeriesLista
                    })
                })
                .catch(err => console.error(err));

        })
    }
    render() {
        return (
            <div className="container">
                <h2 className="section-title">Favoritos</h2>
                <section className="row cards" id="movies">

                    {this.state.ListadePeliculas.length === 0 ? <h3>No hay peliculas favoritas</h3> :
                        this.state.ListadePeliculas.map(pelicula => {
                            return <CarPMovies
                                key={pelicula.id}
                                id={pelicula.id}
                                title={pelicula.title}
                                poster={pelicula.poster_path ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : ""}
                                overview={pelicula.overview}
                            />
                        })}

                    {this.state.ListadeSeries.length === 0 ? <h3>No hay series favoritas</h3> :
                        this.state.ListadeSeries.map(serie => {
                            return <CardPopularSeries
                                key={serie.id}
                                id={serie.id}
                                title={serie.name}
                                poster={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : null}
                                overview={serie.overview}
                                borrando={() => this.borrar(serie.id)}
                            />
                        })}
                </section>
            </div>
        )
    }

}

export default Favoritos