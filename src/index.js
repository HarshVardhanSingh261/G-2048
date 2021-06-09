import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import * as deepcopy from "deepcopy";
function GiveRand(min, max) {
  var p = Math.floor(Math.random() * (max - min) + min);
  return p;
}


//For touch sense
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.xDown = null;                                                        
    this.yDown = null;
    this.firstTouch = null;
    this.state = {
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      gmaeOver: false,
      score: 0,
      Highscore: 0,
    };
  }

  initBoard() {
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    let x1 = GiveRand(0, 4),
      x2 = GiveRand(0, 4),
      y1 = GiveRand(0, 4),
      y2 = GiveRand(0, 4);
    board[x1][y1] = 2 * GiveRand(1, 3);
    board[x2][y2] = 2 * GiveRand(1, 3);
    this.setState({ board, gmaeOver: false, score:0 });
  }

  getBlankCoordinates(Board) {
    
    const blankCoordinates = [];

    for (let r = 0; r < Board.length; r++) {
      for (let c = 0; c < Board[r].length; c++) {
        if (Board[r][c] === 0) {
          blankCoordinates.push([r, c]);
        }
      }
    }

    return blankCoordinates;
  }

  placeRand(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = 2*GiveRand(1,3);
    
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }

  isChanged(original, updated) {
    return (JSON.stringify(updated) === JSON.stringify(original)) ? false : true;
  }


  up(board) {
    let b = deepcopy(board);
    const a = deepcopy(b);
    
    for (let i = 0; i < 4; i++) {
      for(let j=0;j  < 4;j++){
        if(b[j][i]===0){
          var p=j+1;
          while(p<4 && b[p][i]===0 ){
            p++
          }
          if(p===4)
          break;
          var temp=b[p][i];
          b[p][i]=b[j][i]
          b[j][i]=temp
        }
      }
    }
    var score=0;
    for (let i = 0; i < 4; i++) {
      for(let j=0;j<3;j++){
        if(b[j][i]===b[j+1][i])
        {
          b[j][i]*=2
          score+=b[j][i];
          var k=j+1
          while(k<3){
            b[k][i]=b[k+1][i]
            k++
          }
          b[k][i]=0
        }
      }
    }
    
    if(this.isChanged(a,b))
      {b = this.placeRand(b)}
      
    return {b,score};
  }

  down(board) {
    let b = deepcopy(board);
    const a = deepcopy(b);
    
    for (let i = 0; i < 4; i++) {
      for(let j=3;j  > 0 ;j--){
        if(b[j][i]===0){
          var p=j-1;
          while(p>=0 && b[p][i]===0 ){
            p--
          }
          if(p===-1)
          break;
          var temp=b[p][i];
          b[p][i]=b[j][i]
          b[j][i]=temp
        }
      }
    }
    var score=0;
    for (let i = 0; i < 4; i++) {
      for(let j=3;j>0;j--){
        if(b[j][i]===b[j-1][i])
        {
          b[j][i]*=2
          score+=b[j][i]
          var k=j-1
          while(k>0){
            b[k][i]=b[k-1][i]
            k--
          }
          b[k][i]=0
        }
      }
    }
    
    if(this.isChanged(a,b))
      {b = this.placeRand(b)}

   return {b,score};
  }

  right(board) {
    let b = deepcopy(board);
    const a = deepcopy(b);
    
    for (let i = 0; i < 4; i++) {
      for(let j=3;j  > 0 ;j--){
        if(b[i][j]===0){
          var p=j-1;
          while(p>=0 && b[i][p]===0 ){
            p--
          }
          if(p===-1)
          break;
          var temp=b[i][p];
          b[i][p]=b[i][j]
          b[i][j]=temp
        }
      }
    }
    var score=0;
    for (let i = 0; i < 4; i++) {
      for(let j=3;j>0;j--){
        if(b[i][j]===b[i][j-1])
        {
          b[i][j]*=2
          score+=b[i][j];
          var k=j-1
          while(k>0){
            b[i][k]=b[i][k-1]
            k--
          }
          b[i][k]=0
        }
      }
    }
    
    if(this.isChanged(a,b))
      {b = this.placeRand(b)}

   return {b,score};
  }

  left(board) {
    let b = deepcopy(board);
    const a = deepcopy(b);
    
    for (let i = 0; i < 4; i++) {
      for(let j=0;j  < 4;j++){
        if(b[i][j]===0){
          var p=j+1;
          while(p<4 && b[i][p]===0 ){
            p++
          }
          if(p===4)
          break;
          var temp=b[i][p];
          b[i][p]=b[i][j]
          b[i][j]=temp
        }
      }
    }
    var score=0;
    for (let i = 0; i < 4; i++) {
      for(let j=0;j<3;j++){
        if(b[i][j]===b[i][j+1])
        {
          b[i][j]*=2
          score+=b[i][j]
          var k=j+1
          while(k<3){
            b[i][k]=b[i][k+1]
            k++
          }
          b[i][k]=0
        }
      }
    }
    
    if(this.isChanged(a,b))
      {b = this.placeRand(b)}

   return {b,score};
  }

  isGameOver(board){
    let PossMoves=[
      this.isChanged(board,this.up(board).b),
      this.isChanged(board,this.down(board).b),
      this.isChanged(board,this.right(board).b),
      this.isChanged(board,this.left(board).b)

    ]

    return (PossMoves.includes(true))?false:true;

  }

  componentDidMount() {
    this.initBoard();  
    var hs = window.localStorage.getItem('score')
    var hsi = (hs)?JSON.parse(hs):0;
    this.setState({Highscore:hsi})
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('touchstart', this.handleTouchStart.bind(this),false);        
    document.addEventListener('touchmove', this.handleTouchMove.bind(this),false);
  }
  

  // getTouches(evt) {
  //   return evt.touches ||             // browser API
  //         evt.originalEvent.touches; // jQuery
  // }                                                     

  handleTouchStart(evt) {
      //console.log(evt);
      this.firstTouch = (evt.touches ||             // browser API
      evt.originalEvent.touches)[0];                                      
      this.xDown = this.firstTouch.clientX;                                      
      this.yDown = this.firstTouch.clientY;                                      
  };                                                

  handleTouchMove(evt) {
      if ( ! this.xDown || ! this.yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = this.xDown - xUp;
      var yDiff = this.yDown - yUp;
      // console.log(this.xDown,this.yDown)
      // console.log(xDiff,yDiff);
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
            this.makeMove('left');
          } else {
            this.makeMove('right');
          }                       
      } else {
          if ( yDiff > 0 ) {
            this.makeMove('up');
          } else { 
            this.makeMove('down');
          }                                                                 
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;                                             
  }
  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37
    const n = 78;
    // console.log(e.keyCode)
    if (e.keyCode === up) {
      this.makeMove('up');
    } else if (e.keyCode === right) {
      this.makeMove('right');
    } else if (e.keyCode === down) {
      this.makeMove('down');
    } else if (e.keyCode === left) {
      this.makeMove('left');
    } else if (e.keyCode === n) {
      this.initBoard();
    }
  }




  makeMove(dir){
    if(!this.state.gmaeOver){
      if(dir==='up'){
        const obj = this.up(this.state.board);
        const b = obj.b;
        const score = obj.score;
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
        else this.setState({board:b,gmaeOver:false, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
      }
      else if(dir==='down'){
        const obj = this.down(this.state.board);
        const b = obj.b;
        const score = obj.score;
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
        else this.setState({board:b,gmaeOver:false, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
      }
      else if(dir==='right'){
        const obj = this.right(this.state.board);
        const b = obj.b;
        const score = obj.score;
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
        else this.setState({board:b,gmaeOver:false, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
      }
      else if(dir==='left'){
        const obj = this.left(this.state.board);
        const b = obj.b;
        const score = obj.score;
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
        else this.setState({board:b,gmaeOver:false, score:(score+this.state.score), Highscore:Math.max(score+this.state.score,this.state.Highscore)});
      }
    }
    window.localStorage.setItem('score',this.state.Highscore)
  }

  componentWillUnmount(){
    
      window.localStorage.setItem('score',this.state.Highscore)
      const body = document.querySelector('body');
      body.removeEventListener('keydown', this.handleKeyDown.bind(this));
      document.removeEventListener('touchstart', this.handleTouchStart.bind(this));        
      document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    
    

  }

  render() {
    return (
      <div>
        <h1>2048!</h1>
        <h3><span className="score">Score: {this.state.score}</span><span className="highscore"> High score: {this.state.Highscore}</span></h3>
        <table>
          {this.state.board.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </table>
        <div
          className="button"
          onClick={() => {
            this.initBoard();
          }}
        >
          New Game
        </div>
        <div className="buttons">
          <div
            className="button"
            onClick={() => {
              this.makeMove('up');
            }}
          >
            Up
          </div>
          <div
            className="button"
            onClick={() => {
              this.makeMove('down');
            }}
          >
            down
          </div>
          <div
            className="button"
            onClick={() => {
              this.makeMove('right');
            }}
          >
            right
          </div>
          <div
            className="button"
            onClick={() => {
              this.makeMove('left');
            }}
          >
            Left
          </div>
        </div>
        
        <h2>{this.state.gmaeOver?"Game Over!":"Game on!!"}</h2>
      </div>
    );
  }
}

const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} cellValue={cell} />
      ))}
    </tr>
  );
};


const Cell = ({ cellValue }) => {
  let color = 'cell';
  let value = (cellValue === 0) ? '' : cellValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <td>
      <div className={color}>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
