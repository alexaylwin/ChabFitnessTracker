import { Component, OnInit } from '@angular/core';
import { Exercise, EXERCISE_LIST } from '../models/exercise';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  today: Date = new Date();
  pointTotal: number = 99;
  exerciseList: Array<Exercise> = EXERCISE_LIST;

  displayedColumns = ['type', 'count', 'points'];

  private exerciseEntryControls = {
    type: [''],
    count: [''],
    points: ['']
  };

  public exercisesForm = this.fb.group({
    exerciseEntries: this.fb.array([
      this.fb.group(this.exerciseEntryControls)
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.exerciseEntries.push(this.fb.group(this.exerciseEntryControls));
    console.log(this.exercisesForm);
  }

  get exerciseEntries(): FormArray {
    return this.exercisesForm.get('exerciseEntries') as FormArray;
  }

}
