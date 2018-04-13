import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss'
import Home from './Home';
import NotFound from './NotFound';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import routes from './routes';

const theme = {
  colorPrimary: 'green'
}

const pageLinks = [{
  name: 'Home',
  path: '/',
}, {
  name: 'Grid',
  path: '/grid',
}];

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          {pageLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              activeStyle={{fontWeight: 'bold'}}
              style={{ padding: '10px' }}
              exact
              to={path}
            >
              {name}
            </NavLink>
          ))}
          <Switch>
            {routes.map(({ path, exact, component: C, ...rest }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => (
                  <C {...props} {...rest} data={this.props.data}/>
                )}
              />
            ))}
            <Route render={(props) => <NotFound {...props} />} />
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
