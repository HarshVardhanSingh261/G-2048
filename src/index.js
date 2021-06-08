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

    this.state = {
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      gmaeOver: false,
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
    this.setState({ board, gmaeOver: false });
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
    for (let i = 0; i < 4; i++) {
      for(let j=0;j<3;j++){
        if(b[j][i]===b[j+1][i])
        {
          b[j][i]*=2
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
      
    return b;
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
    for (let i = 0; i < 4; i++) {
      for(let j=3;j>0;j--){
        if(b[j][i]===b[j-1][i])
        {
          b[j][i]*=2
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

   return b;
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
    for (let i = 0; i < 4; i++) {
      for(let j=3;j>0;j--){
        if(b[i][j]===b[i][j-1])
        {
          b[i][j]*=2
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

   return b;
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
    for (let i = 0; i < 4; i++) {
      for(let j=0;j<3;j++){
        if(b[i][j]===b[i][j+1])
        {
          b[i][j]*=2
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

   return b;
  }

  isGameOver(board){
    let PossMoves=[
      this.isChanged(board,this.up(board)),
      this.isChanged(board,this.down(board)),
      this.isChanged(board,this.right(board)),
      this.isChanged(board,this.left(board))

    ]

    return (PossMoves.includes(true))?false:true;

  }

  componentWillMount() {
    this.initBoard();  
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37
    const n = 78;
    console.log(e.keyCode)
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
        const b = this.up(this.state.board);
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true});
        else this.setState({board:b,gmaeOver:false});
      }
      else if(dir==='down'){
        const b = this.down(this.state.board);
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true});
        else this.setState({board:b,gmaeOver:false});
      }
      else if(dir==='right'){
        const b = this.right(this.state.board);
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true});
        else this.setState({board:b,gmaeOver:false});
      }
      else if(dir==='left'){
        const b = this.left(this.state.board);
        if(this.isGameOver(b))
          this.setState({board:b, gmaeOver:true});
        else this.setState({board:b,gmaeOver:false});
      }
    }
    
  }

  render() {
    return (
      <div>
        <h1>2048!</h1>
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
