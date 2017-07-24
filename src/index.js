import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick= {props.onClick} >
        {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} 
             onClick={() => this.props.onClick(i)} 
           />;
  }
  
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  render() {

    const history =  this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move)=> {
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={()=> this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if(winner) {
      status = 'Winner is ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i)=> this.handleClick(i)}   
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState({
      history: history.concat([{squares: squares}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (var index = 0; index < lines.length; index++) {
    const [a,b,c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//=======================================
const me = {
  firstName: "Harper",
  lastName: 'Perez'
};

//const element = <h1>hello {formatName(me)}</h1>;

function formatName(user) {
  return user.firstName + '.' + user.lastName;
}

function Welcome(props) {
  return <h1>hello {formatName(props.name)}</h1>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  render() {
    return <div>
        <h1>The time is {this.state.time.toLocaleTimeString()}.</h1>
        <h1>The date is {this.state.time.toLocaleDateString()}.</h1>
      </div>;
  }

  componentDidMount() {
    console.log('componentDidMount!');
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }
   
}


  const timeElement = (
    <div>
      <Welcome name={
        {
          firstName: "Harper",
          lastName: 'sun'
        }
      }/>
      <Clock />
    </div>
  );

//**************************************************************//
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      scale: props.scale,
      temperature: props.value
    };
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    console.log('props.value: ' + this.props.value);
    return (
      <fieldset>
          <legend>Enter temperature in {scaleNames[this.state.scale]}</legend>
          <input
            value={this.props.value}
            onChange={this.handleChange}
          />
        </fieldset>
    );
  }
}

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FahrenheitValue: '',
      CelsiusValue: ''
    };
    this.handleCelsiusCahnge = this.handleCelsiusCahnge.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusCahnge(value) {
    if (parseFloat(value)) {
    }
     console.log('handleCelsiusCahnge value: ' + value);
    var  FahrenheitValue = (parseFloat(value) - 32) * 5 / 9;
     console.log('FahrenheitValue: ' + FahrenheitValue);
    this.setState ({
      FahrenheitValue: FahrenheitValue + '',
      CelsiusValue: value
    });
  }

 handleFahrenheitChange(value) {
   console.log('Fahrenheit: ' + value);
    var  CelsiusValue = (parseFloat(value) * 9 / 5) - 32;
    this.setState({
      FahrenheitValue: value,
      CelsiusValue: CelsiusValue + ''
    });
  }

  render() {
    console.log('Calculator render!');
    console.log('this.state.CelsiusValue: ' + this.state.CelsiusValue);
    return (
      <div>
        <TemperatureInput 
          scale='c' 
          value={this.state.CelsiusValue}
          onChange={this.handleCelsiusCahnge} 
        />
        <TemperatureInput 
          scale='f' 
          value={this.state.FahrenheitValue} 
          onChange={()=>this.handleFahrenheitChange}
        />
      </div>
    );
  }
}


ReactDOM.render(
  <Calculator />,
  document.getElementById('root'),
);
