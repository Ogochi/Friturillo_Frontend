import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import FrontPage from './FrontPage.jsx';
import App from './App.jsx';
import Contact from './Contact.jsx';
import MainLayout from './MainLayout.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
      <MainLayout>
        <Route exact path="/" component={FrontPage} />
        <Route path="/trasa" component={App} />
        <Route path="/kontakt" component={Contact} />
      </MainLayout>
    </BrowserRouter>
  
  ), document.getElementById('root')
);

registerServiceWorker();
