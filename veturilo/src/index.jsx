import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FrontPage from './FrontPage.jsx';
import App from './App.jsx';
import Contact from './Contact.jsx';
import MainLayout from './MainLayout.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <MainLayout>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route path="/trasa" component={App} />
        <Route path="/kontakt" component={Contact} />
      </Switch>
    </BrowserRouter>
  </MainLayout>
  ), document.getElementById('root')
);

registerServiceWorker();
