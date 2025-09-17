import React,{Component} from "react";
import { withRouter } from "react-router-dom";

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            query:"",
            resultados:[]}
            // tipo: 'movie'}
    }

    
    handleChange(e){
        this.setState({
            query: e.target.value
        })
    }

    // handleTipo(e){
    //     this.setState({
    //         tipo: e.target.value
    //     })
    // }
    
    handleSubmit(e,tipo){
        e.preventDefault();
        this.props.history.push(`/search/${tipo}?query=${this.state.query}`);
        this.buscarPersonajes(this.state.query,this.state.tipo)
    }
    
    
    buscarPersonajes(query){
        !query? null : 
        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=fda0b1f448b62d0af82df1475fcde076&language=es-ES&query=${query}&page=1`)
        .then(res => res.json())
        .then(data => this.setState({ resultados: data.results? data.results : [] }))
        .catch(err => console.log(err));
}

    render(){
        return(
            <React.Fragment>
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input
                type="text"
                placeholder= {`Buscar ${this.state.tipo === 'movie'? 'peliculas' : 'series'}...`}
                value={this.state.query}
                onChange={(e)=>this.handleChange(e)}/>

                <button onClick={e => this.handleSubmit(e, "movie")}>Buscar Películas</button>
                <button onClick={e => this.handleSubmit(e, "tv")}>Buscar Series</button>
                
            </form>
            </React.Fragment>
        )
    }

}

export default withRouter(Search);