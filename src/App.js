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
import DetailSeriesP from './components/DetailSeriesP/DetailSeriesP';
import DetailSeriesTop from './components/DetailSeriesTop/DetailSeriesTop';


function NotFound() {
  return <h1>404 - Página no encontrada</h1>;
}

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
          <Route path="/moviePopular/:id" exact component={DetailMoviesScreenP} />
          <Route path="/serieTop/:id" exact component={DetailSeriesTop} />
          <Route path="/seriePopular/:id" exact component={DetailSeriesP} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

