import React,{Component} from "react";
import "./DetailMovies.css";

class DetailMovies extends Component{
    constructor(props){
    super(props);
    this.state ={
      favoritos:[],
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
    }
  }

componentDidMount(){
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



render(){
    return(
    <React.Fragment>
      <img src={this.props.image} alt={this.props.title}/>
      <h4>{this.props.title}</h4>
      <p>{this.props.vote}</p>
      <p>{this.props.release}</p>
      <p>{this.props.duracion}</p>
      <p>{this.props.descripcion}</p>
      {this.props.generos.length > 0? <p>{this.props.generos.filter(g => this.props.genero.includes(g.id)).map(g => <p>{g.name}</p>)}</p>: <p>"Cargando..."</p> }
      {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >Eliminar de favoritos </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} > ⭐ Agregar a favoritos</button>}
    </React.Fragment>
    )
  }
}

export default DetailMovies;


