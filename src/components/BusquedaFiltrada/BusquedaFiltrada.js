import React,{Component} from "react";
import { withRouter } from "react-router-dom";

class BusquedaFiltrada extends Component{
    constructor(props){
        super(props)
        this.state = {
            query:""
        }
        
    }

    handleChange(e){
        this.setState({
            query: e.target.value
        })
        this.props.buscar(e.target.value); 
    }

    render(){
        return(
            <React.Fragment>
            <form>
                <input className="search-input"
                type="text"
                placeholder="Buscar pelicula..."
                value={this.state.query}
                onChange={(e)=>this.handleChange(e)}/>
                
            </form>
            </React.Fragment>
        )
    }

}

export default withRouter(BusquedaFiltrada);