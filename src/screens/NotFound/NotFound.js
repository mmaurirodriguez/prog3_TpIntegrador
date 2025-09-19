import React, { Component } from "react";
export default class NotFound extends Component {
    constructor(props) {
        super(props)
    }

render(){
    return (
        <React.Fragment>
            <div className="container">
                <h2 className="section-title">No se ha encontrado la pagina que estas buscando </h2>
            </div>
        </React.Fragment>
    );
}}
