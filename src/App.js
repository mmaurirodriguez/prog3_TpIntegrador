import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from './screens/Home/Home';
import Popular from './screens/Popular/Popular';
import Nowplaying from './screens/NowPlaying/NowPlaying';
import DetailMovies from './components/DetailMovies/DetailMovies';
import PopularSeries from './screens/PopularSeries/PopularSeries';
import TopRatedrSeries from './screens/TopRatedSeries/TopRatedSeries';
import DetailMoviesScreen from './screens/DetailMoviesScreen/DetailMoviesScreen';
import DetailMoviesScreenP from './screens/DetailMoviesScreenP/DetailMoviesScreenP';
import DetailSeriesTop from './components/DetailSeriesTop/DetailSeriesTop';
import Favoritos from './screens/Favorites/Favorites';
import DetailSeries from './components/DetailSeries/DetailSeries';
import NotFound from './screens/NotFound/NotFound';


export default function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/PopularMovies" exact component={Popular} />
          <Route path="/NowPlayingMovies" exact component={Nowplaying} />
          <Route path="/PopularSeries" exact component={PopularSeries} />
          <Route path="/TopRatedSeries" exact component={TopRatedrSeries} />
          <Route path="/movieNow/:id" exact component={DetailMoviesScreen} />
          <Route path="/moviePopular/:id" exact component={DetailMoviesScreen} />
          <Route path="/serieTop/:id" exact component={DetailSeries} />
          <Route path="/seriePopular/:id" exact component={DetailSeries} />
          <Route path= "/favoritas" exact component= {Favoritos} />
          <Route path= "" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

