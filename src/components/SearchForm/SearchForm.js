import React, { Component } from "react";

export default class SearchForm extends Component {
  render() {
    return (
        <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input
                type="text"
                name = "query"
                placeholder= {`Buscar ${this.props.tipo === 'movie'? 'peliculas' : 'series'}...`}
                value={this.props.query}
                onChange={this.props.handleChange}/>

                <button type= "button" onClick={this.props.handleTipo}>Buscar Películas</button>
                <button type= "button" onClick={this.props.handleTipo}>Buscar Series</button>

                <button type="submit">Buscar</button>
        </form>
    );
  }
}