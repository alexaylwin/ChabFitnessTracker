import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise, EXERCISE_LIST, ExerciseRecord } from '../models/exercise';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  today: Date = new Date();
  pointTotal: number = 99;
  exerciseList: Array<Exercise> = EXERCISE_LIST;

  @ViewChild(MatTable)
  tableInstance: MatTable<FormControl>;

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
    this.exercisesForm.valueChanges.pipe(
      debounceTime(350)
    ).subscribe( (form) => {
      const newForm: Array<ExerciseRecord> = new Array<ExerciseRecord>();
      form.exerciseEntries.forEach( (record: ExerciseRecord) => {
        // TODO: Use actual calculation
        record.points = record.count * 100;
        newForm.push(record);
      });
      this.exercisesForm.setValue({exerciseEntries: newForm}, { emitEvent: false});
    });
  }

  onAddExercise() {
    this.exerciseEntries.push(this.fb.group(this.exerciseEntryControls));
    this.tableInstance.renderRows();
  }

  onSaveWorkout() {
    console.log(this.exercisesForm);
  }

  get exerciseEntries(): FormArray {
    return this.exercisesForm.get('exerciseEntries') as FormArray;
  }

}
