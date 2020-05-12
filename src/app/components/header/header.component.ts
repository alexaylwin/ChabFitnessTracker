import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('helpDialogTemplate') helpDialogTemplate: TemplateRef<any>;
  helpDialogRef: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onHelpClick() {
    this.helpDialogRef = this.dialog.open(this.helpDialogTemplate);
  }

  onDismissClick() {
    this.helpDialogRef.close();
  }
}
