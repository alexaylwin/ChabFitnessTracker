import { Component, OnInit, ViewChild, HostListener, TemplateRef} from '@angular/core';
import { Exercise, EXERCISE_LIST, ExerciseRecord, GetExerciseByType, CalculateExercisePoints } from '../../models/exercise';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { debounce, debounceTime } from 'rxjs/operators';
import { FeatureToggleService } from '../../services/feature-toggle.service';
import { StorageService } from 'src/app/services/storage.service';
import { WorkoutRecord } from 'src/app/models/workout';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  today: string = '';
  totalPoints: number = 0;
  exerciseList: Array<Exercise> = EXERCISE_LIST;

  @ViewChild(MatTable)
  tableInstance: MatTable<FormControl>;

  @ViewChild('saveHelpDialogTemplate') saveHelpDialogTemplate: TemplateRef<any>;
  saveHelpDialogRef: MatDialogRef<any, any>;

  @ViewChild('saveCompleteDialogTemplate') saveCompleteDialogTemplate: TemplateRef<any>;
  saveCompleteDialogRef: MatDialogRef<any, any>; 

  displayedColumns = ['type', 'count', 'points', 'remove'];

  private entryControlRow = {
    type: [''],
    count: [''],
    points: ['']
  };

  public exercisesForm = this.fb.group({
    exerciseEntries: this.fb.array([
      this.fb.group(this.entryControlRow)
    ])
  });

  constructor(private fb: FormBuilder, public ft: FeatureToggleService, private storage: StorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const day = new Date();
    this.today = day.toLocaleString('default', { month: 'long' }) + ' ' + day.getDate().toString();

    this.exercisesForm.valueChanges.pipe(
      debounceTime(350)
    ).subscribe( (form) => {
      // TODO: we update every row when any value changes - could we make this smarter?
      // see if we can access `element` for each field, that gives us the control group
      const newForm: Array<ExerciseRecord> = new Array<ExerciseRecord>();
      let newPoints = 0;
      form.exerciseEntries.forEach( (record: ExerciseRecord) => {
        record.points = CalculateExercisePoints(GetExerciseByType(record.type), record.count);
        newPoints = newPoints + record.points;
        newForm.push(record);
      });
      this.exercisesForm.setValue({exerciseEntries: newForm}, { emitEvent: false});
      this.totalPoints = newPoints;
    });
  }

  @HostListener('document:keydown.a')
  onAddExercise(): void {
    this.exerciseEntries.push(this.fb.group(this.entryControlRow));
    this.tableInstance.renderRows();
  }

  onSaveWorkout(): void {
    const exercises = new Array<ExerciseRecord>();
    this.exercisesForm.value.exerciseEntries.forEach( exercise => {
      exercises.push({type: exercise.type, points: exercise.points, count: exercise.count });
    });

    this.storage.saveWorkout({exercises: exercises, date: new Date(), totalPoints: this.totalPoints});
    this.exercisesForm.reset();
    this.exercisesForm.setControl('exerciseEntries', this.fb.array([
      this.fb.group(this.entryControlRow)
    ]));
    this.tableInstance.renderRows();
    this.saveCompleteDialogRef = this.dialog.open(this.saveCompleteDialogTemplate);

  }

  onRemoveRow(element: any): void {
    console.log(element);
    this.exerciseEntries.removeAt(this.exerciseEntries.controls.findIndex( (v) => v === element ));
    this.tableInstance.renderRows();
  }

  onSaveHelpClick(): void {
    this.saveHelpDialogRef = this.dialog.open(this.saveHelpDialogTemplate);
  }

  onDismissHelp(): void {
    this.saveHelpDialogRef.close();
  }

  onDismissSaveComplete(): void {
    this.saveCompleteDialogRef.close();
  }

  get exerciseEntries(): FormArray {
    return this.exercisesForm.get('exerciseEntries') as FormArray;
  }
}
