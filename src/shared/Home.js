import React, { Component } from 'react';
import injectSheet from 'react-jss'

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

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <div>
          <button onClick={() => {this.setState({visible: !this.state.visible})}}>Toggle</button>
          {this.state.visible && (<StyledButton fontWeight="bold">I am a button with green background</StyledButton>)}
        </div>
      </div>
    );
  }
}

export default Home;
