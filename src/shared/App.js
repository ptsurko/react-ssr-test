import React, { Component } from 'react';
import {renderToString} from 'react-dom/server'
import injectSheet, { ThemeProvider,  JssProvider, SheetsRegistry } from 'react-jss'
import Grid from './Grid';

const Button = ({classes, children}) => (
  <button className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </button>
)

const styles = theme => ({
  button: {
    background: theme.colorPrimary
  },
  label2: {
    color: 'red',
  },
  label: (props) => ({
    fontWeight: props.fontWeight
  }),
})

const StyledButton = injectSheet(styles)(Button)

const theme = {
  colorPrimary: 'green'
}


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div>
            <button onClick={() => {this.setState({visible: !this.state.visible})}}>Toggle</button>
            {this.state.visible && (<StyledButton fontWeight="bold">I am a button with green background</StyledButton>)}
          </div>
          <div>
            <Grid data={this.props.data} />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
