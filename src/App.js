import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShortenForm from './components/ShortenForm';
import RedirectURL from './components/RedirectURL';
import LoginForm from './components/LoginForm';
import AuthService from './services/AuthService';
import PrivateRoute from './common/router';
import SignUpForm from './components/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  return (
    <> 
      <ToastContainer />
      <Router basename="/url-shortener-client">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <PrivateRoute
            path="/shorten-url"
            component={ShortenForm}
            isAuthenticated={AuthService.isAuthenticated()}
          />
          <Route path="/:shortUrl" component={RedirectURL} />
          <Route path="/sign_up" component={SignUpForm} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </>
   
  );
};

export default App;
