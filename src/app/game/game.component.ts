import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  noFilter = false;
  game: Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }


  // pop() => The last value is taken from the array and then it is removed
  takeCard() {
    if (!this.takeCardAnimation && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.takeCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.noFilter = true;
        this.game.players.push(name);
      }
    });
  }
}
