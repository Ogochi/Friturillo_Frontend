import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import Description from './Description.jsx';
import App from './App.jsx';
import Stations from './Stations.jsx';
import Contact from './Contact.jsx';
import MainLayout from './MainLayout.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
      <MainLayout>
        <Route exact path="/" component={App} />
        <Route path="/opis" component={Description} />
        <Route path="/stacje" component={Stations} />
        <Route path="/kontakt" component={Contact} />
      </MainLayout>
    </BrowserRouter>
  
  ), document.getElementById('root')
);

registerServiceWorker();
