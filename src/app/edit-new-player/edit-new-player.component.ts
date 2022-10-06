import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-new-player',
  templateUrl: './edit-new-player.component.html',
  styleUrls: ['./edit-new-player.component.scss']
})
export class EditNewPlayerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditNewPlayerComponent>) { }

  ngOnInit(): void {
  }

}
