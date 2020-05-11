import { ExerciseRecord } from './exercise';

export interface Workout {
  exercises: Array<ExerciseRecord>;
  date: Date;
}