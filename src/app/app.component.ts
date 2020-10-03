import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from './dialog/info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19-fe';

  constructor(private dialog:MatDialog){}

openAboutUs(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width='500px',
  dialogConfig.height='300px',
  dialogConfig.autoFocus = true;
  this.dialog.open(InfoDialogComponent,dialogConfig);
}
}