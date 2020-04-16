import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
const Users = React.lazy(() => import('./Components/Users'));
const Product = React.lazy(() => import('./Components/Product'));


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className='container-fluid body-self'>
            <div className='row header  '>
            </div>
            <div className='row '>
              <div className='col-md-3 sidebar'>
                <h4>Sidebar </h4>
                <hr />
                <ul>
                  <li>
                    <Link to='/Products'>Products</Link>
                  </li>
                  <li>
                    <Link to='/Users'>Users</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Suspense fallback={<div style={{ backgroundColor: 'red', width: '10%' }}>Loading...</div>}>
            <Switch>
              <Route exact path='/' />
              <Route exact path='/products' component={Product} />
              <Route exact path='/users' component={Users} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;