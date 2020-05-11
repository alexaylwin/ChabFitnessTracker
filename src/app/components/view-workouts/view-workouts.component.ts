import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { WorkoutRecord } from 'src/app/models/workout';

@Component({
  selector: 'app-view-workouts',
  templateUrl: './view-workouts.component.html',
  styleUrls: ['./view-workouts.component.scss']
})
export class ViewWorkoutsComponent implements OnInit {

  workouts: Array<WorkoutRecord>;
  constructor(private ss: StorageService) { }

  ngOnInit(): void {
    this.workouts = this.ss.getWorkouts();
  }

}
