import { Component, OnInit } from '@angular/core';
import { addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Firestore, collection } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  btnAnimation = false;
  btnFire = false;

  constructor(private router: Router, private firestore: Firestore) { }

  ngOnInit(): void {
  }


  async newGame() {
    let game = new Game();

    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, { game: game.toJSON() }).then((gameInfo: any) => {
        this.btnAnimation = true;
        this.btnFire = true;
        
        setTimeout(() => {
          this.router.navigateByUrl('/game/' + gameInfo.id);
        }, 2000);
      });
  }

  // async newGame() {
  //   let game = new Game();

  //   const gameCollection = collection(this.firestore, 'games');
  //   const docRef = await addDoc(gameCollection, { game: game.toJSON() }).then(gameinfo: any) => {
  //     this.router.navigateByUrl('/game/' + gameinfo.id);
  //   }

  //   this.btnAnimation = true;
  //   this.btnFire = true;

  //   setTimeout(() => {
  //     this.router.navigateByUrl('/game/' + docRef.id);
  //   }, 2000);
  // }

}
