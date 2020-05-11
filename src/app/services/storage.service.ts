import { Injectable } from '@angular/core';
import { WorkoutRecord } from '../models/workout';
import { Recoverable } from 'repl';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly WORKOUT_KEY: string = 'workouts';
  private ls: Storage = localStorage;
  constructor() { }

  public saveWorkout(workout: WorkoutRecord): boolean {
    let workouts: Array<WorkoutRecord> = JSON.parse(this.ls.getItem('workouts'));
    if (!workouts) {
      workouts = new Array<WorkoutRecord>();
    }
    workouts.push(workout);
    this.ls.setItem(this.WORKOUT_KEY, JSON.stringify(workouts));

    return true;
  }

  public getWorkouts(): Array<WorkoutRecord> {
    let workouts: Array<any> = JSON.parse(this.ls.getItem('workouts'));
    if (!workouts) {
      workouts = new Array<any>();
    }
    workouts.forEach( rec => {
      rec.date = new Date(rec.date);
    });
    return workouts as Array<WorkoutRecord>;
  }
}
