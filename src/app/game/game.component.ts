import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  games$: Observable<any>;
  gameID: string;
  noFilter: boolean;
  endGame = false;


  constructor(private route: ActivatedRoute, private router: Router, public firestore: Firestore, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.newGame();
    this.openDialog();

    this.route.params.subscribe(newGame => {
      this.gameID = newGame['id'];
      const docRef = doc(this.firestore, 'games', this.gameID);
      this.games$ = docData(docRef);
      this.updateGame();
    });
  }


  updateGame() {
    this.games$.subscribe((newGame: any) => {
      this.getDoc(this.gameID);
      this.game.players = newGame['players'];
      this.game.stack = newGame['stack'];
      this.game.playedCards = newGame['playedCards'];
      this.game.currentPlayer = newGame['currentPlayer'];
      this.game.takeCardAnimation = newGame['takeCardAnimation'];
      this.game.currentCard = newGame['currentCard'];
    });
  }


  async restartGame() {
    let game = new Game();

    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, { game: game.toJSON() }).then(() => {
      this.router.navigateByUrl('/game/' + this.gameID);
    });
  }


  getDoc(params: any) {
    onSnapshot(doc(this.firestore, 'games', params), (doc) => {
      let data: any = doc.data();
      this.game = data['game'];
    });
  }


  async newGame() {
    this.game = new Game();
  }


  // pop() => The last value is taken from the array and then it is removed
  takeCard() {
    if (!this.game.takeCardAnimation && this.game.players.length > 0) {
      this.proveStackLength();
      this.game.currentCard = this.game.stack.pop();
      this.game.takeCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      this.cardAnimation();
    } 
  }


  cardAnimation() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.takeCardAnimation = false;
      this.saveGame();
    }, 1000);
  }


  proveStackLength(): void {
    console.log('Game End', this.game.stack.length);
    if (this.game.stack.length < 40 ) {
      setTimeout(() => {
        this.endGame = true;
        console.log('Game End');
      }, 1000);

      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 6000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.noFilter = true;
        this.saveGame();
      }
    });
  }


  saveGame() {
    updateDoc(doc(this.firestore, 'games', this.gameID), { game: this.game });
  }
}