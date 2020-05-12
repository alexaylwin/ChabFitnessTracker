import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { WorkoutRecord } from '../models/workout';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store a workout in local storage', () => {
    const newWorkout: WorkoutRecord = {
      exercises: [{count: 10, type: 'Pull-up (reps)', points: 8}],
      totalPoints: 8,
      date: new Date()
    };

    service.saveWorkout(newWorkout);

    expect(
      (JSON.parse(localStorage.getItem('workouts')) as Array<any>).length
    ).toBe(1);
  });

  it('should get a workout from local storage', () => {
    const newWorkout: WorkoutRecord = {
      exercises: [{count: 10, type: 'Pull-up (reps)', points: 8}],
      totalPoints: 8,
      date: new Date()
    };
    localStorage.setItem('workouts', JSON.stringify([newWorkout]));
    expect(service.getWorkouts()).toEqual([newWorkout]);
  })
});
