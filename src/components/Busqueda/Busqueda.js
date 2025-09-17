import React,{Component} from "react";
import { withRouter } from "react-router-dom";

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            query:"",
            resultados:[]}
    }

    
    handleChange(e){
        this.setState({
            query: e.target.value
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.history.push(`series&movies/search/?name=${this.state.query}`);
        this.buscarPersonajes(this.state.query)
    }
    
    
    buscarPersonajes(query){
        !query? null : 
        fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
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
                placeholder="Buscar personaje..."
                value={this.state.query}
                onChange={(e)=>this.handleChange(e)}/>
                
            </form>
            </React.Fragment>
        )
    }

}

export default withRouter(Search);