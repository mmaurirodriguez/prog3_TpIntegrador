import React,{Component} from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Header from "../Header/Header";

class Busqueda extends Component{
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
        .then((data) => {
          let resultados = data.results ? data.results : [];
          let queryLower = query.toLowerCase();

          // 🔹 1. Coincidencia exacta
          let exactos = resultados.filter(
            (item) =>
              (item.title && item.title.toLowerCase() === queryLower) ||
              (item.name && item.name.toLowerCase() === queryLower)
          );

          if (exactos.length > 0) {
            this.setState({ resultados: exactos });
          } else {
            // 🔹 2. Coincidencias parciales por palabras
            let palabrasQuery = queryLower.split(" ");

            let coincidencias = resultados.filter((item) => {
              let titulo = (item.title || item.name || "").toLowerCase();
              let palabrasTitulo = titulo.split(" ");

              // usamos map para chequear cada palabra del query contra las del título
              let coincidencia = palabrasQuery.filter((palabraQuery) => {
                // devolvemos las palabras del título que sean exactamente iguales a palabraQuery
                let iguales = palabrasTitulo.filter(
                  (palabraTitulo) => palabraTitulo === palabraQuery
                );
                return iguales.length > 0; // si encontró coincidencia
              });

              return coincidencia.length > 0; // si alguna palabra del query está en el título
            });

            this.setState({ resultados: coincidencias });
          }
        })
        .catch((err) => console.log(err));
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

        <Header
          query={this.state.query}
          tipo={this.state.tipo}
          handleChange={(e)=>this.handleChange(e)}
          handleTipo={(e)=>this.handleTipo(e)}
          handleSubmit={(e)=>this.handleSubmit(e)}
        />


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
                    <p className="card-text">{item.overview}</p>
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

export default withRouter(Busqueda);