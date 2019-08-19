import React from 'react';
import {Button, WingBlank, WhiteSpace} from 'antd-mobile';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className = "App">
        <WhiteSpace />
        <WingBlank>
          <Button loading>test</Button>
        </WingBlank>
        
      </div>
    );
  }
}

export default App;
