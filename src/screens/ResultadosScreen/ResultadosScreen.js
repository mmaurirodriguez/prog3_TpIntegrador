import React,{Component} from "react";
import CardAMovies from "../../components/CardAMovies/CardAMovies";
import CardPMovies from "../../components/CardPMovies/CardPMovies";
import CardPopularSeries from "../../components/CardPopularSeries/CardPopularSeries";
import CardTopRatedSeries from "../../components/CardTopRatedSeries/CardTopRatedSeries";

class ResultadosScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            resultados: [],
        }
    }

    componentDidMount(){
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTMxY2JhNTA4MmU1N2RkZjZkMDczOWY5YzU4YThkNyIsIm5iZiI6MTc1Nzc5MzUzMC45Niwic3ViIjoiNjhjNWNjZmFjMjBhOWE2YTNiMGQ4YTc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gzKI_HjVhftt68y7ZrMfNluKhiERK48_fWp3nk4v46c'
      }
    };
       fetch() 
    }
}

export default ResultadosScreen;