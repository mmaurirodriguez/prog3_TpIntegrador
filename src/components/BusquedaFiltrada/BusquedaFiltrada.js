import React,{Component} from "react";

class BusquedaFiltrada extends Component{
    constructor(props){
        super(props)
        this.state={
            search:""
        }
    }

    handleChange(e){
        this.setState({
            search: e.target.value.toLowerCase()
        })
    }

    handleSubmit(e){
        e.preventDefault()
    }

    render(){
        return(
            <React.Fragment>
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input
                type="text"
                placeholder="Buscar personaje..."
                value={this.state.search}
                onChange={(e)=>this.handleChange(e)}/>
                
            </form>
            </React.Fragment>
        )
    }
}

export default BusquedaFiltrada;