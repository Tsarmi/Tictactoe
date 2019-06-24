import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string,
    values: string[][]
    movcounter: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

	private _state$: BehaviorSubject<State>;

  constructor() { 

	  let initialState = {
	    turn: 'PLAYERX',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
	    ],
      movcounter: 0
	  };

	  this._state$ = new BehaviorSubject(initialState);

  }

  get state$ (): BehaviorSubject<State> {
    return this._state$; 
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }
  
  updateValue(row, col) {
    if(this.state.values[row][col] === '-') {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this.state.movcounter = this.state.movcounter+1;
      this._state$.next(this.state);
    }
  }

  
  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
    movcounter: 0
    };
  }
  
  winner(): string {
      let win = false;
      let turn = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let board = this.state.values
      let msg = "No winner at the moment"
      // at least must be 5 movements to declare a winner
      if (this.state.movcounter >= 5) {
          // rows
          win = win || (board[0][0] === turn && board[0][1] === turn && board[0][2] === turn );
          win = win || (board[1][0] === turn && board[1][1] === turn && board[1][2] === turn );
          win = win || (board[2][0] === turn && board[2][1] === turn && board[2][2] === turn );
          // cols
          win = win || (board[0][0] === turn && board[1][0] === turn && board[2][0] === turn );
          win = win || (board[0][1] === turn && board[1][1] === turn && board[2][1] === turn );
          win = win || (board[0][2] === turn && board[2][2] === turn && board[2][2] === turn );
          // diags
          win = win || (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn );
          win = win || (board[0][2] === turn && board[1][1] === turn && board[2][0] === turn );                    
      }      
      console.log ("Winner?", win)
      
      if (win) {
          msg = "..and the winner is PLAYER " + turn
      } 
      
    return msg;
  }
  
  
  

}


