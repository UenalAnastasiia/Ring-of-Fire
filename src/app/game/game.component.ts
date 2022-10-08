import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot,docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  noFilter: any;
  game: Game;
  currentCard: string = '';
  games$: Observable<any>;
  gameID;
  gameOver = false;


  constructor(private route: ActivatedRoute, private router: Router, public firestore: Firestore, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(param => {
      this.gameID = param['id'];
      const docRef = doc(this.firestore, 'games', this.gameID);
      this.games$ = docData(docRef);

      this.games$.subscribe( () => {
        this.getDoc(this.gameID);
      });
      // this.games$.subscribe(game => {
      //   this.game.players = game['players'];
      //   this.game.stack = game['stack'];
      //   this.game.playedCards = game['playedCards'];
      //   this.game.currentPlayer = game['currentPlayer'];
      // })
    });
  }

  // getDoc(doc(gameCollection, params['id'])).then( game => console.log(game) );

  // this.games$.subscribe( (newGame: any) => {
  //   console.log('Update: ', newGame);
  // })
  // });

  async restartGame() {
    let game = new Game();

    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, { game: game.toJSON() }
    ).then( () => {
      this.router.navigateByUrl('/game/' + this.gameID);
    });
    this.gameOver = false;
  }

  getDoc(params: any) {
    onSnapshot(doc(this.firestore, 'games', params), (doc) => {
      let data: any = doc.data();
      this.game = data['game'];
    });
  }

  newGame() {
    this.game = new Game();
    // const gameCollection = collection(this.firestore, 'games');
    // const gameDocumentReference = await addDoc(gameCollection, { game: this.game.toJSON() });
    // const newGameRef = doc(collection(gameCollection, "games"));
    // await setDoc(newGameRef, this.game);

    // this.route.params.subscribe((params) => {
    //   console.log(params['id']);

    //   const gameCollection = collection(this.firestore, 'games');

    //   const gameDocumentReference = doc(this.firestore, 'games');
    //   docData(gameDocumentReference, { idField: 'gameid' });
    //   addDoc(gameCollection, { game: this.game.toJSON() });
    //   doc(gameCollection), (params['gameid']);
    //   console.log('Update', this.game);
    // });

    // const gameCollection = collection(this.firestore, 'games');
    // let gameInfo = await addDoc(gameCollection, { game: this.game.toJSON() });
    // console.log(gameInfo);
  }


  // pop() => The last value is taken from the array and then it is removed
  takeCard() {
    if (!this.takeCardAnimation && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();

      setTimeout(() => {
        this.takeCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }


  // editPlayer(playerId) {
  //   console.log('edit player', playerId);
    
  //   const dialogRef = this.dialog.open(EditNewPlayerComponent);
  //   dialogRef.afterClosed().subscribe((change: string) => {
  //       if (change == 'DELETE') {
  //         this.game.players.splice(playerId, 1)
  //       } 
  //       this.saveGame;
  //   })
  // }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.noFilter = true;
        this.saveGame();
      } else {
        this.noFilter = false;
      }
    });
  }


  saveGame() {
    updateDoc(doc(this.firestore,'games', this.gameID), { game: this.game });
  }
}
