import React,{Component} from "react";
import "../DetailMovies/DetailMovies.css";

class DetailSeries extends Component{
    constructor(props){
    super(props);
    this.state ={
      favoritos:[],
      TextoBotonF: "Agregar a favoritos",
      esFav: false,
    }
  }

agregarAFavoritos(serie){
  this.setState({
    favoritos: this.state.favoritos.concat(serie)
  })
}

render(){
    return(
    <React.Fragment>
      <img src={this.props.image} alt={this.props.title}/>
      <h4>{this.props.title}</h4>
      <p>{this.props.vote}</p>
      <p>{this.props.release}</p>
      <p>{this.props.descripcion}</p>
      {this.props.generos.length > 0? <p>{this.props.generos.filter(g => this.props.genero.includes(g.id)).map(g => <p>{g.name}</p>)}</p>: <p>"Cargando..."</p> }
      {/* {this.state.esFav ? <button className = "btn alert-primary" onClick={() => this.BorrarFavorito(this.props.id)} >Eliminar de favoritos </button>: <button className = "btn alert-primary" onClick={() => this.AgregarAFavorito(this.props.id)} > ⭐ Agregar a favoritos</button>} */}
    </React.Fragment>
    )
  }
}

export default DetailSeries;


