import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from './screens/Home/Home';

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
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

