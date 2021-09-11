import React from 'react';
import { Route } from 'react-router-dom';
import Paths from '../utils/Constants';
import Login from './Pages/login/login';
import Home from './Pages/home/home';
import Users from './Pages/users/users';
import Extras from './Pages/extras/extras';
import Informes from './Pages/infomes/informes';
import Import from './Pages/import/import';


const Routes = () => {  
    return (
      <>
          <Route exact path={Paths.LOGIN} component={Login} />
          <Route exact path={Paths.HOME} component={Home} />
          <Route exact path={Paths.USERS} component={Users} />
          <Route exact path={Paths.EXTRAS} component={Extras} />
          <Route exact path={Paths.INFORMES} component={Informes} />
          <Route exact path={Paths.IMPORT} component={Import} />
      </>
    );
  };
  
  export default Routes;
  