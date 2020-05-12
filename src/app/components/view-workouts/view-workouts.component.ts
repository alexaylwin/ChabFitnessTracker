import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { WorkoutRecord } from 'src/app/models/workout';
import { FeatureToggleService } from 'src/app/services/feature-toggle.service';
import { DateTime, Interval, Duration } from 'luxon';

interface WorkoutsByWeek {
  weekNumber: number;
  week: Interval;
  workouts: Array<WorkoutRecord>;
  totalPoints: number;
  weekLabel: string;
}


@Component({
  selector: 'app-view-workouts',
  templateUrl: './view-workouts.component.html',
  styleUrls: ['./view-workouts.component.scss']
})
export class ViewWorkoutsComponent implements OnInit {

  sortedWorkouts: Array<WorkoutsByWeek> = new Array<WorkoutsByWeek>();
  constructor(private storage: StorageService, public ft: FeatureToggleService) { }

  ngOnInit(): void {
    const allWorkouts = this.storage.getWorkouts();
    // Parse the workouts and split them by week
    allWorkouts.forEach( (wr: WorkoutRecord) => {
      //Convert to a luxon date
      const dt = DateTime.fromJSDate(wr.date);

      // Check to see if we already have a WbW entry for this week
      const wbwRecordIndex: number = this.sortedWorkouts.findIndex( (wbw: WorkoutsByWeek) => wbw.weekNumber === dt.weekNumber);
      if (wbwRecordIndex >= 0) {
        //Add the workout to the same week
        this.sortedWorkouts[wbwRecordIndex].workouts.push(wr);
        this.sortedWorkouts[wbwRecordIndex].totalPoints = this.sortedWorkouts[wbwRecordIndex].totalPoints + wr.totalPoints;

      } else {
        //Construct a new wbw record
        const weekNumber: number = dt.weekNumber;
        const week: Interval = Interval.fromDateTimes(
          DateTime.fromObject({weekNumber: dt.weekNumber}),
          DateTime.fromObject({weekNumber: dt.weekNumber}).plus(Duration.fromObject({days: 6})));

        const weekLabel: string = week.start.monthLong + ' ' + week.start.day.toString() + '-' + week.end.day.toString();
        const workouts: Array<WorkoutRecord> = [wr];
        const totalPoints = wr.totalPoints;
        this.sortedWorkouts.push({week, weekNumber, weekLabel, workouts, totalPoints});
      }
    });
  }

}
