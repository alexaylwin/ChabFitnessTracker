import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeatureToggleService } from 'src/app/services/feature-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('helpDialogTemplate') helpDialogTemplate: TemplateRef<any>;
  helpDialogRef: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog, public ft: FeatureToggleService) { }

  ngOnInit(): void {
  }

  onHelpClick() {
    this.helpDialogRef = this.dialog.open(this.helpDialogTemplate);
  }

  onDismissClick() {
    this.helpDialogRef.close();
  }
}
