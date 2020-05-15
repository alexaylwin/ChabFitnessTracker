import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeatureToggleService } from 'src/app/services/feature-toggle.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('helpDialogTemplate') helpDialogTemplate: TemplateRef<any>;
  helpDialogRef: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog, public ft: FeatureToggleService, public storage: StorageService) { }

  ngOnInit(): void {
  }

  onHelpClick() {
    this.helpDialogRef = this.dialog.open(this.helpDialogTemplate);
  }

  onDownloadClick() {
    const blob = new Blob([JSON.stringify(this.storage.getWorkouts())], { type: 'text/json' });
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'workouts.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onDismissClick() {
    this.helpDialogRef.close();
  }
}
