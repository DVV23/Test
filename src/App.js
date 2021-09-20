import React from 'react';
import './App.css';
import { Route } from 'react-router';
import Header from './Components/Header/Header';
import MainPageContainer from './Components/MainPage/MainPageContainer';

const App = () => {
  return (
    <div className="parent">
      <Header />
      <Route path="/" render={() => <MainPageContainer />}></Route>
    </div>
  );
};

export default App;
