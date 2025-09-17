import React,{Component} from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            query:"",
            resultados:[],
            tipo: 'movie',
            verMas: false,
            textoBoton:"Ver descripcion"}
    }

    handleChange(e){
        this.setState({
            query: e.target.value
        })
    }

    handleTipo(e){
         this.setState({
             tipo: e.target.value
         })
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.history.push(`/search/${this.state.tipo}?query=${this.state.query}`);
        this.buscarPersonajes(this.state.query,this.state.tipo)
    }
    
    
    buscarPersonajes(query){
        return !query? null : 
        fetch(`https://api.themoviedb.org/3/search/${this.state.tipo}?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&query=${query}&page=1`)
        .then(res => res.json())
        .then(data => this.setState({ resultados: data.results? data.results : [] }))
        .catch(err => console.log(err));
    }

    toggleVerMas = () => {
    this.setState((prev) => ({
      verMas: !prev.verMas,
      textoBoton:
        prev.textoBoton === "Ver descripción"
          ? "Ocultar descripción"
          : "Ver descripción",
    }));
  };

    render(){
        return(
            <React.Fragment>
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input
                type="text"
                placeholder= {`Buscar ${this.state.tipo === 'movie'? 'peliculas' : 'series'}...`}
                value={this.state.query}
                onChange={(e)=>this.handleChange(e)}/>

                <button type="submit">Buscar</button>
            </form>

                <button type= "button" onClick={e => this.setState({tipo: 'movie'})}>Buscar Películas</button>
                <button type= "button" onClick={e => this.setState({tipo: 'tv'})}>Buscar Series</button>
            <section className="row cards">
           {this.state.resultados.length === 0 ? (
          <p>No hay resultados</p>
        ) : (
          this.state.resultados.map((item) => (
            <article key={item.id} className="single-card-playing">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="card-img-top"
              />
              <div className="cardBody">
                <h5 className="card-title">{item.title || item.name}</h5>

                {this.state.verMas && (
                    <p className="card-text">{this.props.overview}</p>
                )}

                <button onClick={this.toggleVerMas} className="btn alert-primary">
                    {this.state.textoBoton}
                </button>

                <Link
                  to={`/movieNow/${item.id}`}
                  className="btn btn-primary"
                  style={{ marginLeft: 8 }}
                >
                  Ir a detalle
                </Link>

                <button
                  className="btn alert-primary"
                  onClick={() => console.log("Favorito:", item.id)}
                >
                  ♥️
                </button>
              </div>
            </article>
          ))
        )}
        </section>
      </React.Fragment>
        )
        
    }

}

export default withRouter(Search);