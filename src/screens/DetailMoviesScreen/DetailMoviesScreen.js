import React from "react";
import DetailMovies from "../../components/DetailMovies/DetailMovies";

function DetailMoviesScreen (props) {
    return(
        
        <DetailMovies match ={props.match}/>
    )
}

export default DetailMoviesScreen;