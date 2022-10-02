import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  game: Game;
  currentCard: string = '';

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  // pop() => The last value is taken from the array and then it is removed
  takeCard() {
    if (!this.takeCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;
      console.log('New Card: ' + this.currentCard);
      console.log('Game is: ' + this.game.playedCards);

      setTimeout(() => {
        this.takeCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }

}
