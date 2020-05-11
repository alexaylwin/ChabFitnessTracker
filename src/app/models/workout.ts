import { ExerciseRecord } from './exercise';

export interface WorkoutRecord {
  exercises: Array<ExerciseRecord>;
  totalPoints: number;
  date: Date;
}