import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  btnAnimation = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    this.btnAnimation = true;

    setTimeout(() => {
      this.router.navigateByUrl('/game');
    }, 1000);
  }

}
