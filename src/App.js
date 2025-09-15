import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from './screens/Home/Home';
import PopularMovies from './screens/Movies/PopularMovies';
import AirMovies from './screens/Movies/AirMovies';
import DetailMovies from './components/DetailMovies/DetailMovies';


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
          <Route path="/PopularMovies" exact component={PopularMovies} />
          <Route path="/AirMovies" exact component={AirMovies} />
          <Route path="/movie/:id" exact component={DetailMovies} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

