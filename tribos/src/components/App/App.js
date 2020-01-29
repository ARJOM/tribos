import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import {AuthProvider} from "../../services/Auth";

import {urls} from "../../utils/urlUtils";

import Login from "../Login/Login";

import FirebaseService from "../../services/FirebaseService";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Switch>

          <Route exact
                 path={urls.home.path}
                 render={() =>
                     <div>
                       <h1>Home</h1>
                       <button onClick={FirebaseService.logout}>Logout</button>
                     </div>}
          />

          <Route exact
                 path={urls.login.path}
                 render={(props) =>
                 <Login {...props}/>}
          />

          <Route exact
                 path={urls.singup.path}
                 render={() =>
                 <h1>Cadastro</h1>}
          />

        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
