import React from 'react';
import {WingBlank, WhiteSpace, Flex, List, InputItem, NavBar, Toast} from 'antd-mobile';
import './App.css';
import med from './med'
class Header extends React.PureComponent {
  render() {
    return (
      <NavBar leftContent={null} mode="dark">伤寒钤法</NavBar>
    );
  }
}

class YearInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrorFirst: false,
      hasErrorSecond: false,
    };
    this.onInputFirstChange = this.onInputFirstChange.bind(this);
    this.onInputSecondChange = this.onInputSecondChange.bind(this);
  }

  isValid(s) {
    if (!s) return true;
    if (s.length > 2) return false;
    let n = parseInt(s);
    if (n) {
      if (n > 0 && n < 61) {
        return n.toString()===s;
      } else {
        return false;
      }
    }
    if (s.length !== 2) return false;
    if (!med.stems.includes(s[0])) return false;
    if (!med.branches.includes(s[1])) return false;
    return true;
  }

  onInputFirstChange(value) {
    let isError = !this.isValid(value);
    this.setState({hasErrorFirst: isError});
    if (!isError && value) this.props.firstCallback(value);
  }

  onInputSecondChange(value) {
    let isError = !this.isValid(value);
    this.setState({hasErrorSecond: isError});
    if (!isError && value) this.props.secondCallback(value);
  }

  onErrorClick() {
    Toast.info("请输入1-60的数字或者正确的天干地支")
  }

  render() {
    return (
      <WingBlank>
        <Flex>
          <Flex.Item><List><InputItem placeholder="出生年干支" error={this.state.hasErrorFirst} onChange={this.onInputFirstChange} onErrorClick={this.onErrorClick} maxLength="2"></InputItem></List></Flex.Item>
          <Flex.Item><List><InputItem placeholder="患病日干支" error={this.state.hasErrorSecond} onChange={this.onInputSecondChange} onErrorClick={this.onErrorClick} maxLength="2"></InputItem></List></Flex.Item>
        </Flex>
      </WingBlank>
    );
  }
}

const ListItem = List.Item;
class SolutionItem extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }

  render() {
    if (this.props.important) {
      return (
        <ListItem platform="android" onClick={()=>{}} extra="本条目更准确">{this.props.solutionName}</ListItem>
      );
    }
    return (
      <ListItem platform="android" onClick={()=>{}}>{this.props.solutionName}</ListItem>
    );
  }
}

class Solutions extends React.Component {
  render() {
    return (
      <List renderHeader="搜索结果" renderFooter={"共 " + this.props.solutions.length.toString() + " 条结果"}>
        {this.props.solutions.map((solution) => {return <SolutionItem solutionName={solution} key={solution} />})}
      </List>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstInput: NaN,
      secondInput: NaN,
      filteredSolutions: [],
    };
    this.firstInputCallback = this.firstInputCallback.bind(this);
    this.secondInputCallback = this.secondInputCallback.bind(this);
    this.updateSolutions = this.updateSolutions.bind(this);
    this.convertSB = this.convertSB.bind(this);
    this.SB = [];
    for (let i = 0; i < 60; i++) {
      this.SB.push(med.stems[i % 10].concat(med.branches[i % 12]));
    }
  }

  firstInputCallback(str) {
    console.log(str);
    this.updateSolutions(0, str);
  }

  secondInputCallback(str) {
    console.log(str);
    this.updateSolutions(1, str);
  }

  convertSB(str) {
    let i = parseInt(str);
    return isNaN(i) ? this.SB.indexOf(str) : i - 1;
  }

  updateSolutions(idx, str) {
    let old = [this.state.firstInput, this.state.secondInput];
    old[idx] = this.convertSB(str);
    let a = [];
    med.data.forEach((value) => {
      if (value.x === old[0] && value.y === old[1]) {
        a.push(med.medicineInfo[value.z]);
      }
    });
    this.setState({
      firstInput: old[0],
      secondInput: old[1],
      filteredSolutions: a,
    });
  }

  render() {
    return (
      <div className = "App">
        <Header />
        <WhiteSpace />
        <YearInput firstCallback={this.firstInputCallback} secondCallback={this.secondInputCallback} />
        <WhiteSpace />
        <Solutions solutions={this.state.filteredSolutions} />
      </div>
    );
  }
}

export default App;
